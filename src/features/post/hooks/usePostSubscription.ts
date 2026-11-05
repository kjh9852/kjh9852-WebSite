import { useQueryClient } from '@tanstack/react-query';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { db } from '@/api/firebase';
import { useToastStore } from '@/store/toastStore';

import type { Post } from '../types';

export function usePostSubscription() {
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const posts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate().toISOString(),
        })) as Post[];

        queryClient.setQueryData(['post'], posts);

        setInitialized(true);
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

  return { initialized };
}
