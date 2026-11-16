import { useQuery } from '@tanstack/react-query';

import type { Post } from '../types';

export function useGetPosts() {
  return useQuery<Post[]>({
    queryKey: ['post'],
    queryFn: () => [], // onSnapshot에서 setQueryData로 관리
    initialData: [],
    staleTime: Infinity,
  });
}
