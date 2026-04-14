import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getProjects } from '@/features/project/api/project';

export function useGetProjects(category: string) {
  return useQuery({
    queryKey: ['project', category],
    queryFn: () => getProjects(category),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
  });
}
