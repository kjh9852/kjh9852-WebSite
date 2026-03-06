import gsap from 'gsap';
import { useState, useEffect, useRef } from 'react';

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
  const closeModalRef = useRef(closeModal);
  const [isAnimating, setIsAnimating] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const startAnimation = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    closeModalRef.current = closeModal;
  }, [closeModal]);

  const ModalComponent = modalType ? MODAL_COMPONENT[modalType] : null;

  useEffect(() => {
    if (!isOpen && !isAnimating) return;
    startAnimation.current?.kill();

    startAnimation.current = gsap.timeline({
      defaults: {
        duration: 0.5,
      },
    });

    if (isOpen && !isAnimating) {
      startAnimation.current
        .fromTo(
          modalRef.current,
          { y: 50, yPercent: -50, opacity: 0 },
          { y: 0, opacity: 1, clearProps: 'transform' }
        )
        .fromTo(backDropRef.current, { opacity: 0 }, { opacity: 1 }, '<0.03');
    } else if (isAnimating) {
      startAnimation.current
        .fromTo(
          modalRef.current,
          { y: 0, opacity: 1 },
          {
            y: 50,
            yPercent: -50,
            opacity: 0,
            clearProps: 'transform',
          }
        )
        .fromTo(
          backDropRef.current,
          { opacity: 1 },
          {
            opacity: 0,
            onComplete: () => {
              setIsAnimating(false);
              closeModalRef.current();
            },
          },
          '<0.03'
        );
    }

    return () => {
      startAnimation.current?.kill();
    };
  }, [isOpen, isAnimating]);

  if (!isOpen && !isAnimating) return null;

  const renderModalType = () => {
    switch (modalType) {
      case 'signIn':
        return <SignIn />;
      case 'signUp':
        return <SignUp />;
      case 'profileSetting':
        return <ProfileSetting />;
      case 'withdrawal':
        return <Withdrawal />;
      default:
        return null;
    }
  };

  return (
    <div ref={container}>
      <div
        ref={backDropRef}
        className={styles.backDrop}
        onClick={handleCloseAnimation}
      ></div>
      <div
        ref={modalRef}
        className={`${styles.container} ${modalType ? styles[modalType] : ''}`}
      >
        {ModalComponent && <ModalComponent />}
      </div>
    </div>
  );
}
