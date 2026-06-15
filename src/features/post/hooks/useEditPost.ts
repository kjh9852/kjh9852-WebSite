import { useMutation, useQueryClient } from '@tanstack/react-query';

import { editPost } from '../api/post';

export function useEditPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editPost,
    onSuccess: (_, variables) => {
      const { postId } = variables;
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
    },
  });
}
