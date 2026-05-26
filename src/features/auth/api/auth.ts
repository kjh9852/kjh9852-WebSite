import { FirebaseError } from 'firebase/app';
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth';
import type { User } from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';

import { authService, db } from '@/api/firebase';
import { FIREBASE_AUTH_MESSAGES } from '@/constants/authMessage';

import type { SignUpType, SignInType } from '../types';

const handleAuthError = (error: unknown, defaultMessage: string) => {
  if (error instanceof FirebaseError) {
    const message = FIREBASE_AUTH_MESSAGES[error.code];
    return new Error(message);
  }
  return new Error(defaultMessage);
};

export const getUser = () => {
  return new Promise<User | null>((resolve) => {
    const unsubscribe = onAuthStateChanged(authService, (user) => {
      resolve(user);
      unsubscribe();
    });
  });
};

export const signUp = async ({
  email,
  password,
  displayName,
  photoURL,
}: SignUpType): Promise<User> => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      authService,
      email,
      password
    );

    await updateProfile(user, {
      displayName: displayName,
      photoURL: photoURL ?? null,
    });

    await user.reload();

    const updateUser = authService.currentUser;

    if (!updateUser) throw new Error('유저 정보를 찾을 수 없습니다.');

    await setDoc(doc(db, 'users', updateUser.uid), {
      uid: updateUser.uid,
      email: updateUser.email,
      displayName,
      photoURL: updateUser.photoURL,
      isAdmin: false,
      createdAt: serverTimestamp(),
    });

    return updateUser;
  } catch (error: unknown) {
    throw handleAuthError(error, '회원가입 처리 중 오류가 발생했습니다.');
  }
};

export const signIn = async ({
  email,
  password,
}: SignInType): Promise<User> => {
  try {
    const result = await signInWithEmailAndPassword(
      authService,
      email,
      password
    );
    return result.user;
  } catch (error: unknown) {
    throw handleAuthError(error, '로그인 중 오류가 발생했습니다.');
  }
};

export const signOut = async (): Promise<void> => {
  try {
    await firebaseSignOut(authService);
  } catch (error: unknown) {
    throw handleAuthError(error, '로그아웃 중 오류가 발생했습니다.');
  }
};
