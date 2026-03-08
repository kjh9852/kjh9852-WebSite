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
  const isClosingRef = useRef(false);

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

  return (
    <div ref={container}>
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
