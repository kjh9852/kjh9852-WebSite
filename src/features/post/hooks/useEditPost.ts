import { useMutation } from '@tanstack/react-query';

import { editPost } from '@/features/post/api/post';
import { type PostFormValues } from '@/features/post/schemas/post.schema';

interface EditPostVariables {
  postId: string;
  data: PostFormValues;
}

export function useEditPost() {
  return useMutation({
    mutationFn: ({ postId, data }: EditPostVariables) => editPost(postId, data),
  });
}
