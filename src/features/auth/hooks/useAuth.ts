import { useQuery } from '@tanstack/react-query';
import type { User } from 'firebase/auth';

import { getUser } from '@/features/auth/api/auth';

export function useAuth() {
  return useQuery<User | null>({
    queryKey: ['currentUser'],
    queryFn: getUser,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
  });
}
