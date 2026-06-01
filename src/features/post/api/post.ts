import { FirebaseError } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  collection,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';

import { db } from '@/api/firebase';
import { FIREBASE_FIRESTORE_MESSAGES } from '@/constants/firebaseMessage';

import type { PostFormValues } from '../schemas/post.schema';
import type { Post, EditPost } from '../types';

export async function uploadPost(data: PostFormValues): Promise<void> {
  const auth = getAuth();
  const user = auth.currentUser;
  await addDoc(collection(db, 'post'), {
    ...data,
    authorId: user?.uid,
    createDate: new Date().toISOString(),
    createAt: serverTimestamp(),
  });
}

export async function getAllPost(): Promise<Post[]> {
  const q = query(collection(db, 'post'), orderBy('createDate', 'desc'));
  const response = await getDocs(q);
  const returnData = response.docs.map((doc) => ({
    id: doc.id,
    content: doc.data().content,
    authorId: doc.data().authorId,
    createDate: doc.data().createDate,
    createAt: doc.data().createAt,
  }));
  return returnData;
}

export async function editPost({
  postId,
  updatedPost,
}: EditPost): Promise<void> {
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      const message = FIREBASE_FIRESTORE_MESSAGES[error.code];
      throw new Error(message);
    }
    throw new Error('서버와의 통신 중 오류가 발생했습니다.');
  }
}

export async function getPost(postId: string): Promise<Post | null> {
  const postRef = doc(db, 'post', postId);
  const response = await getDoc(postRef);

  if (!response.exists()) {
    return null;
  }

  const data = response.data();

  return {
    id: response.id,
    authorId: data.authorId,
    content: data.content,
    createDate: data.createDate,
  };
}

export async function deletePost(postId: string): Promise<void> {
  const postRef = doc(db, 'post', postId);

  try {
    await deleteDoc(postRef);
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      const message = FIREBASE_FIRESTORE_MESSAGES[error.code];
      throw new Error(message);
    }
    throw new Error('서버와의 통신 중 오류가 발생했습니다.');
  }
}
