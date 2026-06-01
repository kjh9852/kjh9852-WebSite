import { useMutation } from '@tanstack/react-query';

import { editPost } from '../api/post';

export function useEditPost() {
  return useMutation({
    mutationFn: editPost,
  });
}
