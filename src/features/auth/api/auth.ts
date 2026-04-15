import { FirebaseError } from 'firebase/app';
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth';
import type { User } from 'firebase/auth';

import { authService } from '@/api/firebase';
import { FIREBASE_AUTH_MESSAGES } from '@/constants/authMessage';

export const getUser = () => {
  return new Promise<User | null>((resolve) => {
    const unsubscribe = onAuthStateChanged(authService, (user) => {
      resolve(user); // Firebase가 유저 존재 여부를 알려줄 때까지 기다림
      unsubscribe();
    });
  });
};

export const signUp = async (
  email: string,
  password: string,
  displayName: string,
  photoURL?: string
) => {
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

    const updateUser = authService.currentUser;

    return updateUser;
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      const message = FIREBASE_AUTH_MESSAGES[error.code];
      throw new Error(message);
    }
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(
      authService,
      email,
      password
    );
    return result.user;
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      const message = FIREBASE_AUTH_MESSAGES[error.code];
      throw new Error(message);
    }
    throw new Error('서버와의 통신 중 오류가 발생했습니다.');
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(authService);
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      const message = FIREBASE_AUTH_MESSAGES[error.code];
      throw new Error(message);
    }
    throw new Error('서버와의 통신 중 오류가 발생했습니다.');
  }
};
