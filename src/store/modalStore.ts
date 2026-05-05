import { create } from 'zustand';

export const MODAL_TYPE = {
  SIGN_IN: 'signIn',
  SIGN_UP: 'signUp',
  PROFILE_SETTING: 'profileSetting',
  WITHDRAWAL: 'withdrawal',
  POST: 'post',
} as const;

type ModalDataMap = {
  signIn: undefined;
  signUp: undefined;
  profileSetting: undefined;
  withdrawal: undefined;
  post: undefined;
};

type ModalType = (typeof MODAL_TYPE)[keyof typeof MODAL_TYPE];

type ModalStore = {
  isOpen: boolean;
  modalType: ModalType | null;
  modalData: ModalDataMap[ModalType] | null;
  openModal: <T extends ModalType>(type: T, data?: ModalDataMap[T]) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  modalType: null,
  modalData: null,

  openModal: (type, data) =>
    set({
      modalType: type,
      modalData: data ?? null,
      isOpen: true,
    }),

  closeModal: () =>
    set({
      modalType: null,
      modalData: null,
      isOpen: false,
    }),
}));
