import { useQuery } from '@tanstack/react-query';
import { doc, getDoc } from 'firebase/firestore';

import { db } from '@/api/firebase';

export function useUserMetaData(uid: string) {
  return useQuery({
    queryKey: ['users', uid],
    queryFn: async () => {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) return null;
      return docSnap.data();
    },
    enabled: !!uid,
    staleTime: 1000 * 60 * 5,
  });
}
