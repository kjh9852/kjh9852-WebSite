import { useQueryClient, useMutation } from '@tanstack/react-query';

import { signOut } from '@/features/auth/api/auth';

export function useSignOut() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.clear();
      localStorage.removeItem('REACT_QUERY_OFFLINE_CACHE');
    },
  });
}
