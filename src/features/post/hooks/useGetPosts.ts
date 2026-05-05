import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getAllPost } from '@/features/post/api/post';

export function useGetPosts() {
  return useQuery({
    queryKey: ['post'],
    queryFn: () => getAllPost(),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
  });
}
