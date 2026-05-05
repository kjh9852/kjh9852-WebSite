import { useMutation } from '@tanstack/react-query';

import { uploadPost } from '@/features/post/api/post';
import { type PostFormValues } from '@/features/post/schemas/post.schema';

export function useUploadPost() {
  return useMutation({
    mutationFn: (data: PostFormValues) => uploadPost(data),
  });
}
