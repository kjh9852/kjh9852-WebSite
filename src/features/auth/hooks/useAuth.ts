import { useQuery } from '@tanstack/react-query';

import type { AuthUser } from '../types';

export function useAuth() {
  return useQuery<AuthUser | null>({
    queryKey: ['currentUser'],
    queryFn: () => null,
    initialData: null,
    staleTime: Infinity,
  });
}
