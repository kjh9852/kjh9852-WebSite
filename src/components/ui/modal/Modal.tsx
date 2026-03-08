import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useState, useEffect, useRef, useCallback } from 'react';

import { SignIn, SignUp } from '@/features/auth';
import { ProfileSetting, Withdrawal } from '@/features/profile';
import { useModalStore } from '@/store/modalStore';

import styles from './Modal.module.scss';

const MODAL_COMPONENT = {
  signIn: SignIn,
  signUp: SignUp,
  profileSetting: ProfileSetting,
  withdrawal: Withdrawal,
} as const;

export default function Modal() {
  const { isOpen, modalType, closeModal } = useModalStore();
  const modalRef = useRef<HTMLDivElement>(null);
  const backDropRef = useRef<HTMLDivElement>(null);

  const tl = useRef<gsap.core.Timeline | null>(null);
  const isClosingRef = useRef(false);

  const [shouldRender, setShouldRender] = useState(isOpen);

  const ModalComponent = modalType ? MODAL_COMPONENT[modalType] : null;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (isOpen) setShouldRender(true);
  }, [isOpen]);

  useGSAP(() => {
    if (!shouldRender || !isOpen) return;

    tl.current?.kill();

    tl.current = gsap
      .timeline()
      .fromTo(modalRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1 })
        .fromTo(backDropRef.current, { opacity: 0 }, { opacity: 1 }, '<0.03');
  }, [isOpen, shouldRender]);

  const handleClose = useCallback(() => {
    if (isClosingRef.current || !isOpen) return;

    isClosingRef.current = true;

    tl.current?.kill();

    tl.current = gsap
      .timeline({
        onComplete: () => {
          setShouldRender(false);
          closeModal();
          isClosingRef.current = false;
        },
      })
      .to(modalRef.current, { y: 50, opacity: 0 })
      .to(
          backDropRef.current,
          {
            opacity: 0,
          },
          '<0.03'
        );
  }, [closeModal, isOpen]);

  useEffect(() => {
    if (!shouldRender) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => window.removeEventListener('keydown', handleEsc);
  }, [handleClose, shouldRender]);

  if (!shouldRender) return null;

  return (
    <div className={styles.container}>
      <div
        ref={backDropRef}
        className={styles.backDrop}
        onClick={handleClose}
      />
      <div
        ref={modalRef}
        className={`${styles.container} ${modalType ? styles[modalType] : ''}`}
      >
        {ModalComponent && <ModalComponent />}
      </div>
    </div>
  );
}
