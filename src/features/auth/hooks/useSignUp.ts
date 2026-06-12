import { useMutation, useQueryClient } from '@tanstack/react-query';

import { signUp } from '../api/auth';
import type { AuthUser } from '../types';

export function useSignUp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signUp,
    onSuccess: (newUser, variables) => {
      if (newUser) {
        queryClient.setQueryData<AuthUser>(['currentUser'], {
          uid: newUser.uid,
          email: newUser.email,
          displayName: variables.displayName,
          photoURL: variables.photoURL,
          isAdmin: false,
        });
      }
    },
  });
}
