import { useQueryClient } from '@tanstack/react-query';
import { onAuthStateChanged } from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { useEffect } from 'react';

import { db, authService } from '@/api/firebase';

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
      if (user) {
        try {
          const tokenResult = await user.getIdTokenResult();

          await setDoc(doc(db, 'users', user.uid), {
            uid: user?.uid,
            email: user?.email,
            displayName: user?.displayName,
            photoURL: user?.photoURL,
            isAdmin: !!tokenResult.claims.admin,
            createdAt: serverTimestamp(),
          });

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
      } else {
        queryClient.setQueryData(['currentUser'], null);
      }
    });

    return () => unsubscribe();
  }, [queryClient]);
}
