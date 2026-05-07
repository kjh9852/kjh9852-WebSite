import { useMutation } from '@tanstack/react-query';

import { deletePost } from '@/features/post/api/post';

export function useDeletePost() {
  return useMutation({
    mutationFn: (postId: string) => deletePost(postId),
  });
}
