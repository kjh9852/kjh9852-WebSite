import { useMutation, useQueryClient } from '@tanstack/react-query';

import { signUp } from '../api/auth';

export function useSignUp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signUp,
    onSuccess: (newUser) => {
      if (newUser) {
        queryClient.setQueryData(['currentUser'], {
          uid: newUser.uid,
          email: newUser.email,
          displayName: newUser.displayName,
          photoURL: newUser.photoURL,
          isAdmin: false,
        });
      }
    },
  });
}
