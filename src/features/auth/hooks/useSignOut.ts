import { useMutation } from '@tanstack/react-query';

import { signOut } from '../api/auth';

export function useSignOut() {
  return useMutation({
    mutationFn: signOut,
  });
}
