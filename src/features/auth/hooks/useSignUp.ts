import { useMutation } from '@tanstack/react-query';

import { signUp } from '@/features/auth/api/auth';

export function useSignUp() {
  return useMutation({
    mutationFn: ({
      email,
      password,
      displayName,
      photoURL,
    }: {
      email: string;
      password: string;
      displayName: string;
      photoURL?: string;
    }) => signUp(email, password, displayName, photoURL),
  });
}
