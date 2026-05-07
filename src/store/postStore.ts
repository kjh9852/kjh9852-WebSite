import { create } from 'zustand';

type PostType = 'add' | 'edit' | 'detail' | null;

type PostStore = {
  postId: string | null;
  type: PostType;
  openPost: (type: PostType, id: string) => void;
  closePost: () => void;
};

export const usePostStore = create<PostStore>((set) => ({
  postId: null,
  type: null,

  openPost: (type, id) =>
    set({
      type: type,
      postId: id,
    }),

  closePost: () =>
    set({
      type: null,
      postId: null,
    }),
}));
