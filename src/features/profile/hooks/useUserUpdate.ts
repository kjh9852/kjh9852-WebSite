import { useMutation } from '@tanstack/react-query';

import { userProfileUpdate } from '../api/profile';

export function useUserUpdate() {
  return useMutation({
    mutationFn: ({
      displayName,
      photoURL,
    }: {
      displayName: string;
      photoURL?: string;
    }) => userProfileUpdate(displayName, photoURL),
  });
}
