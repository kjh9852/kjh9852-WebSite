import { useRef } from 'react';

import { useToastStore } from '@/store/toastStore';

import Toast from './Toast';
import styles from './ToastList.module.scss';

export default function ToastList() {
  const container = useRef<HTMLDivElement | null>(null);
  const toasts = useToastStore((state) => state.toasts);
  const hideToast = useToastStore((state) => state.hideToast);

  return (
    <>
      {toasts.length > 0 && (
        <div ref={container} className={styles.container}>
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              id={toast.id}
              type={toast.type}
              message={toast.message}
              hideToast={hideToast}
            />
          ))}
        </div>
      )}
    </>
  );
}
