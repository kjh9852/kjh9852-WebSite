import { useQuery } from '@tanstack/react-query';

import { getPost } from '@/features/post/api/post';

export function useGetPost(postId: string) {
  return useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPost(postId),
    enabled: !!postId,
  });
}
