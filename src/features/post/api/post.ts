import { FirebaseError } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  addDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  collection,
  serverTimestamp,
} from 'firebase/firestore';

import { db } from '@/api/firebase';
import { FIREBASE_FIRESTORE_MESSAGES } from '@/constants/firebaseMessage';

import type { PostFormValues } from '../schemas/post.schema';
import type { Post, EditPost } from '../types';

const handlePostError = (error: unknown, defaultMessage: string) => {
  if (error instanceof FirebaseError) {
    const message = FIREBASE_FIRESTORE_MESSAGES[error.code] || defaultMessage;
    return new Error(message);
  }

  if (error instanceof Error) {
    return error;
  }

  return new Error(defaultMessage);
};

export async function uploadPost(data: PostFormValues): Promise<void> {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) throw new Error('로그인이 필요한 서비스 입니다.');

    await addDoc(collection(db, 'posts'), {
      ...data,
      authorId: user.uid,
      createdAt: serverTimestamp(),
    });
  } catch (error: unknown) {
    throw handlePostError(error, '게시글 업로드 중 오류가 발생했습니다.');
  }
}

export async function editPost({
  postId,
  updatedPost,
}: EditPost): Promise<void> {
  try {
    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, { ...updatedPost, updatedAt: serverTimestamp() });
  } catch (error: unknown) {
    throw handlePostError(error, '서버와의 통신 중 오류가 발생했습니다.');
  }
}

export async function getPost(postId: string): Promise<Post | null> {
  try {
    const postRef = doc(db, 'posts', postId);
    const response = await getDoc(postRef);

    if (!response.exists()) {
      return null;
    }

    const data = response.data();

    return {
      id: response.id,
      authorId: data.authorId,
      content: data.content,
      createdAt: data.createdAt?.toDate()?.toISOString(),
    };
  } catch (error: unknown) {
    throw handlePostError(error, '게시글을 불러오는 중 오류가 발생했습니다.');
  }
}

export async function deletePost(postId: string): Promise<void> {
  try {
    const postRef = doc(db, 'posts', postId);
    await deleteDoc(postRef);
  } catch (error: unknown) {
    throw handlePostError(error, '게시글 삭제 중 오류가 발생했습니다.');
  }
}
