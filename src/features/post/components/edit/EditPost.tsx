import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { useModalStore } from '@/store/modalStore';
import { usePostStore } from '@/store/postStore';
import { useToastStore } from '@/store/toastStore';

import { useEditPost } from '../../hooks/useEditPost';
import { type PostFormValues } from '../../schemas/post.schema';
import { postSchema } from '../../schemas/post.schema';
import { type PostProps } from '../../types';
import PostForm from '../form/PostForm';

export default function EditPost({ post }: PostProps) {
  const { showToast } = useToastStore();
  const { closePost } = usePostStore();
  const { closeModal } = useModalStore();
  const { mutate: editPost, isPending } = useEditPost();
  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      content: post?.content ?? '',
    },
    mode: 'onChange',
  });

  const queryClient = useQueryClient();

  if (!post) return null;

  const handleEditPost = (data: PostFormValues) => {
    console.log(data);
    editPost(
      { postId: post.id, data },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['post'],
          });
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
