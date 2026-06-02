import { useQuery } from '@tanstack/react-query';

import type { Post } from '../types';

export function useGetPosts() {
  return useQuery<Post[]>({
    queryKey: ['post'],
    queryFn: () => {
      return [] as Post[];
    },
    initialData: [],
    staleTime: Infinity,
  });
}
