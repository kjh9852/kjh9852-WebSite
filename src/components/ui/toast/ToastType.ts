export type ToastType = 'warning' | 'success';

export type ToastItem = {
  id: number;
  type: ToastType;
  message: string;
};
