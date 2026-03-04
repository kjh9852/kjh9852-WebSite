import { FirebaseError } from 'firebase/app';
import {
  updateProfile,
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser as firebaseDeleteUser,
} from 'firebase/auth';

import { authService } from '@/api/firebase';
import { FIREBASE_AUTH_MESSAGES } from '@/constants/authMessage';

export const userProfileUpdate = async (
  displayName: string,
  photoURL?: string
) => {
  try {
    if (authService.currentUser !== null) {
      await updateProfile(authService.currentUser, {
        displayName: displayName,
        photoURL: photoURL ?? null,
      });
      await authService.currentUser.reload();
      return authService.currentUser;
    }
  } catch (error: unknown) {
    if (error) {
      throw new Error('유저 변경 에러.');
    }
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
