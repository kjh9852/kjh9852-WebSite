import { useQueryClient } from '@tanstack/react-query';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';

import { authService } from '@/api/firebase';

export type AuthUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isAdmin: boolean;
};

export function useAuthObserver() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authService, async (user) => {
      if (!user) {
        queryClient.setQueryData(['currentUser'], null);
        return;
      }

      try {
        const tokenResult = await user.getIdTokenResult(true);

        const authData: AuthUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          isAdmin: !!tokenResult.claims.admin,
        };

        queryClient.setQueryData(['currentUser'], authData);
      } catch (error) {
        console.log(error);
        queryClient.setQueryData(['currentUser'], null);
      }
    });

    return () => unsubscribe();
  }, [queryClient]);
}
