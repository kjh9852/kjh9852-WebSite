import gsap from 'gsap';
import { useEffect, useRef } from 'react';

import { CheckIcon, CloseIcon } from '@/components/ui/icons';

import styles from './Toast.module.scss';

type ToastType = 'warning' | 'success';

export default function Toast({
  id,
  type,
  message,
  hideToast,
}: {
  id: number;
  type: ToastType;
  message: string;
  hideToast: (id: number) => void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const hideToastRef = useRef(hideToast);
  const startAnimation = useRef<gsap.core.Timeline | null>(null);
  const iconType =
    type === 'warning' ? (
      <CloseIcon size="medium" circle />
    ) : (
      <CheckIcon size="medium" circle />
    );

  useEffect(() => {
    hideToastRef.current = hideToast;
  }, [hideToast]);

  useEffect(() => {
    startAnimation.current = gsap.timeline({
      defaults: {
        duration: 0.3,
      },
    });

    startAnimation.current.fromTo(
      container.current,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
      }
    );

    const timer = setTimeout(() => {
      if (startAnimation.current) {
        startAnimation.current.to(container.current, {
          y: 20,
          opacity: 0,
          duration: 0.3,
          onComplete: () => hideToastRef.current(id),
        });
      } else {
        hideToastRef.current(id);
      }
    }, 3000);

    return () => {
      startAnimation.current?.kill();
      clearTimeout(timer);
    };
  }, [id]);

  const handleClose = () => {
    startAnimation.current?.to(container.current, {
      y: 20,
      opacity: 0,
      duration: 0.3,
      onComplete: () => hideToastRef.current(id),
    });
  };

  return (
    <div ref={container} className={`${styles.container} ${styles[type]}`}>
      <div className={styles.wrapper}>
        <div className={styles.contentContainer}>
          {iconType}
          <p>{message}</p>
        </div>
        <button type="button" onClick={handleClose}>
          <CloseIcon size="small" />
        </button>
      </div>
    </div>
  );
}
