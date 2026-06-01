import { useMutation, useQueryClient } from '@tanstack/react-query';

import { editPost } from '../api/post';

export function useEditPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editPost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['post'] }),
  });
}
