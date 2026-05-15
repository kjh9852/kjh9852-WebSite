import { FirebaseError } from 'firebase/app';
import {
  updateProfile,
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser as firebaseDeleteUser,
} from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

import { db, authService } from '@/api/firebase';
import { FIREBASE_AUTH_MESSAGES } from '@/constants/authMessage';

export const userProfileUpdate = async (
  displayName: string,
  photoURL?: string
) => {
  try {
    const user = authService.currentUser;
    if (user !== null) {
      await updateProfile(user, {
        displayName: displayName,
        photoURL: photoURL ?? null,
      });

      await setDoc(
        doc(db, 'users', user.uid),
        {
          displayName,
          photoURL: photoURL ?? null,
        },
        { merge: true }
      );

      await user.reload();
      return user;
    }
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      const message = FIREBASE_AUTH_MESSAGES[error.code];
      throw new Error(message);
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
};

export const deleteUser = async (password: string) => {
  const user = authService.currentUser;

  if (!user || !user.email) {
    throw new Error('인증된 유저 정보가 없습니다.');
  }

  try {
    const credential = EmailAuthProvider.credential(user.email, password);
    const response = await reauthenticateWithCredential(user, credential);
    if (response) {
      await firebaseDeleteUser(user);
    }
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      if (error.code === 'auth/invalid-credential') {
        throw new Error('비밀번호가 일치하지 않습니다.');
      }
      const message = FIREBASE_AUTH_MESSAGES[error.code];
      throw new Error(message);
    }
  }
};
