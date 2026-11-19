import { create } from 'zustand';

import type { ToastItem, ToastType } from '@/components/ui/toast/ToastType';

type ToastStoreType = {
  type: ToastType;
  toasts: ToastItem[];
  message: string;
  isOpen: boolean;
  showToast: (toast: Omit<ToastItem, 'id'>) => void;
  hideToast: (id: number) => void;
};

let nextToastId = 0;

export const useToastStore = create<ToastStoreType>((set) => ({
  type: 'warning',
  message: '',
  toasts: [],
  isOpen: false,

  showToast: ({ type, message }) => {
    const id = ++nextToastId;

    set((state) => {
      const MAX_TOAST_LIMIT = 3;

      let updateToasts = [...state.toasts, { id, type, message }];

      if (updateToasts.length > MAX_TOAST_LIMIT) {
        updateToasts = updateToasts.slice(-MAX_TOAST_LIMIT);
      }
      return {
        toasts: updateToasts,
      };
    });
  },

  hideToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
