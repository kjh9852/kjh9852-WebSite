import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useModalStore } from '@/store/modalStore';
import { usePostStore } from '@/store/postStore';
import { useToastStore } from '@/store/toastStore';

import { useEditPost } from '../../hooks/useEditPost';
import { type PostFormValues, postSchema } from '../../schemas/post.schema';
import type { PostProps } from '../../types';
import PostForm from '../form/PostForm';

export default function EditPost({ post }: PostProps) {
  const closePost = usePostStore((state) => state.closePost);
  const closeModal = useModalStore((state) => state.closeModal);
  const showToast = useToastStore((state) => state.showToast);
  const { mutate: editPost, isPending } = useEditPost();

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      content: post?.content ?? '',
    },
    mode: 'onChange',
  });

  const handleEditPost = (data: PostFormValues) => {
    editPost(
      { postId: post.id, updatedPost: data },
      {
        onSuccess: () => {
          showToast({ type: 'success', message: '포스트가 수정되었습니다.' });
          closePost();
          closeModal();
        },
        onError: (error: Error) => {
          const message = error.message ?? '수정에 실패하였습니다.';
          showToast({ type: 'warning', message: message });
        },
      }
    );
  };

  return (
    <PostForm
      form={form}
      onUpdatePost={handleEditPost}
      isEdit={true}
      isPending={isPending}
    />
  );
}
