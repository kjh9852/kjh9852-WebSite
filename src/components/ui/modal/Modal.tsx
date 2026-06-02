import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

import { MODAL_ANIMATION } from '@/animations/modalAnimation';
import { SignIn, SignUp } from '@/features/auth';
import { PostSheet } from '@/features/post';
import { ProfileSetting, Withdrawal } from '@/features/profile';
import { useModalStore } from '@/store/modalStore';
import { usePostStore } from '@/store/postStore';

import styles from './Modal.module.scss';

const MODAL_COMPONENT = {
  signIn: SignIn,
  signUp: SignUp,
  profileSetting: ProfileSetting,
  withdrawal: Withdrawal,
  post: PostSheet,
} as const;

export default function Modal() {
  const isOpen = useModalStore((state) => state.isOpen);
  const modalType = useModalStore((state) => state.modalType);
  const closeModal = useModalStore((state) => state.closeModal);
  const type = usePostStore((state) => state.type);
  const modalRef = useRef<HTMLDivElement>(null);
  const backDropRef = useRef<HTMLDivElement>(null);

  const tl = useRef<gsap.core.Timeline | null>(null);
  const isClosingRef = useRef(false);

  const [shouldRender, setShouldRender] = useState(isOpen);

  const ModalComponent = modalType ? MODAL_COMPONENT[modalType] : null;

  const isPost = modalType === 'post' && type === 'detail';

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (isOpen) setShouldRender(true);
  }, [isOpen]);

  const animationConfig = useMemo(
    () => (isPost ? MODAL_ANIMATION.post : MODAL_ANIMATION.default),
    [isPost]
  );

  useGSAP(() => {
    if (!shouldRender || !isOpen) return;

    tl.current?.kill();

    tl.current = gsap
      .timeline()
      .fromTo(
        modalRef.current,
        { ...animationConfig.from },
        { ...animationConfig.to, ...animationConfig.default }
      )
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
      .to(modalRef.current, {
        ...animationConfig.exit,
      })
      .to(
        backDropRef.current,
        {
          opacity: 0,
        },
        '<0.03'
      );
  }, [closeModal, isOpen, animationConfig]);

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
      <div ref={modalRef} className={styles.modal}>
        {ModalComponent && <ModalComponent />}
      </div>
    </div>
  );
}
