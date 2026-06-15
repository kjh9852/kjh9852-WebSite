import { useMutation, useQueryClient } from '@tanstack/react-query';

import { authService } from '@/api/firebase';
import type { UserProfile } from '@/features/auth';

import { userProfileUpdate } from '../api/profile';

export function useUserUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userProfileUpdate,
    onSuccess: (_, variables) => {
      const user = authService.currentUser;

      if (user) {
        queryClient.setQueryData<UserProfile>(['currentUser'], (prev) => {
          if (!prev) return prev;

          const updateUser: UserProfile = {
            ...prev,
            displayName: variables.displayName,
            photoURL: variables.photoURL ?? null,
          };

          localStorage.setItem('authUser', JSON.stringify(updateUser));

          return updateUser;
        });

        queryClient.invalidateQueries({
          queryKey: ['users', user.uid],
        });
      }
    },
  });
}
