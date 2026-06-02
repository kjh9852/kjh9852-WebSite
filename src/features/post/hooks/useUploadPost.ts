import { useMutation } from '@tanstack/react-query';

import { uploadPost } from '../api/post';

export function useUploadPost() {
  return useMutation({
    mutationFn: uploadPost,
  });
}
