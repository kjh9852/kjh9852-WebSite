import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useModalStore } from '@/store/modalStore';
import { usePostStore } from '@/store/postStore';
import { useToastStore } from '@/store/toastStore';

import { useUploadPost } from '../../hooks/useUploadPost';
import { postSchema, type PostFormValues } from '../../schemas/post.schema';
import PostForm from '../form/PostForm';

export default function AddPost() {
  const closeModal = useModalStore((state) => state.closeModal);
  const closePost = usePostStore((state) => state.closePost);
  const showToast = useToastStore((state) => state.showToast);
  const { mutate: addPost, isPending } = useUploadPost();

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      content: '',
    },
    mode: 'onChange',
  });

  const handleUploadPost = (data: PostFormValues) => {
    addPost(data, {
      onSuccess: () => {
        showToast({ type: 'success', message: '게시글이 등록되었습니다' });
        closePost();
        closeModal();
      },
      onError: (error) => {
        const message = error.message;
        showToast({ type: 'warning', message: message });
      },
    });
  };

  return (
    <PostForm
      form={form}
      onUpdatePost={handleUploadPost}
      isPending={isPending}
    />
  );
}
