import { useQuery } from '@tanstack/react-query';

import type { AuthUser } from '../types';

const getCachedUser = () => {
  const cached = localStorage.getItem('authUser');
  return cached ? JSON.parse(cached) : undefined;
};

export function useAuth() {
  return useQuery<AuthUser | null>({
    queryKey: ['currentUser'],
    queryFn: () => null,
    initialData: getCachedUser,
    staleTime: Infinity,
  });
}
