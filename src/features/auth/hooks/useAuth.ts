import { useQuery } from '@tanstack/react-query';

export type AuthUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isAdmin: boolean;
};

export function useAuth() {
  return useQuery<AuthUser | null>({
    queryKey: ['currentUser'],
    queryFn: () => null,
    initialData: null,
    staleTime: Infinity,
  });
}
