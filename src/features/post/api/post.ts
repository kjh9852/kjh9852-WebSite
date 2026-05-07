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

import { type Post, type InitialPost } from '../types';

export async function uploadPost(data: InitialPost): Promise<void> {
  const auth = getAuth();
  const user = auth.currentUser;
  await addDoc(collection(db, 'post'), {
    ...data,
    userName: user?.displayName,
    userImage: user?.photoURL,
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
    userName: doc.data().userName,
    userImage: doc.data().userImage,
    authorId: doc.data().authorId,
    createDate: doc.data().createDate,
    createAt: doc.data().createAt,
  }));
  return returnData;
}

export async function editPost(
  postId: string,
  updatePost: { content: string }
): Promise<void> {
  const postRef = doc(db, 'post', postId);

  try {
    await updateDoc(postRef, updatePost);
  } catch (error) {
    console.log(error);
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
    userName: data.userName,
    userImage: data.userImage,
    createDate: data.createDate,
  };
}

export async function deletePost(postId: string): Promise<void> {
  const postRef = doc(db, 'post', postId);

  try {
    await deleteDoc(postRef);
  } catch (error) {
    console.log(error);
  }
}
