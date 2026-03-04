export type ToastType = 'warning' | 'success';

export type ToastItem = {
  id: string;
  type: ToastType;
  message: string;
};
