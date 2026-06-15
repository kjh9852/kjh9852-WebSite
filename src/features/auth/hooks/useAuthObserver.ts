import { useQueryClient } from '@tanstack/react-query';
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { useEffect } from 'react';

import { authService, db } from '@/api/firebase';
import { useToastStore } from '@/store/toastStore';

import type { AuthUser } from '../types';

export function useAuthObserver() {
  const showToast = useToastStore((state) => state.showToast);
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authService, async (user) => {
      if (user) {
        try {
          const tokenResult = await user.getIdTokenResult();

          const userDoc = await getDoc(doc(db, 'users', user.uid));
          const userData = userDoc.data();

          const authData: AuthUser = {
            uid: user.uid,
            email: user.email,
            displayName: userData?.displayName,
            photoURL: userData?.photoURL,
            isAdmin: !!tokenResult.claims.admin,
          };

          localStorage.setItem('authUser', JSON.stringify(authData));

          queryClient.setQueryData(['currentUser'], authData);
        } catch (error) {
          console.error('인증 토큰을 가져오는 중 문제가 발생했습니다:', error);
          showToast({
            type: 'warning',
            message:
              '연결이 불안정하여 로그아웃 되었습니다. 다시 로그인해 주세요.',
          });
          localStorage.removeItem('authUser');
          queryClient.setQueryData(['currentUser'], null);
        }
      } else {
        localStorage.removeItem('authUser');
        queryClient.setQueryData(['currentUser'], null);
      }
    });

    return () => unsubscribe();
  }, [queryClient, showToast]);
}
