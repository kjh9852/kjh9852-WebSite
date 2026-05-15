import { useQueryClient } from '@tanstack/react-query';
import { onSnapshot, collection, orderBy, query } from 'firebase/firestore';
import { useEffect } from 'react';

import { db } from '@/api/firebase';
import { useToastStore } from '@/store/toastStore';

export function usePostSubscription() {
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();
  useEffect(() => {
    const q = query(collection(db, 'post'), orderBy('createAt', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const posts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        queryClient.setQueryData(['post'], posts);
      },
      (error) => {
        console.error('Firebase Subscription Error:', error);

        showToast({
          type: 'warning',
          message: '실시간 게시글을 가져오지 못했습니다.',
        });
      }
    );

    return () => unsubscribe();
  }, [queryClient, showToast]);
}
