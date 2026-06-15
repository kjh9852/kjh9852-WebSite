import { FirebaseError } from 'firebase/app';
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser as firebaseDeleteUser,
} from 'firebase/auth';
import {
  setDoc,
  doc,
  writeBatch,
  where,
  query,
  collection,
  getDocs,
} from 'firebase/firestore';

import { db, authService } from '@/api/firebase';
import { FIREBASE_AUTH_MESSAGES } from '@/constants/authMessage';
import type { UserProfile } from '@/features/auth';

const handleProfileError = (error: unknown, defaultMessage: string) => {
  if (error instanceof FirebaseError) {
    const message = FIREBASE_AUTH_MESSAGES[error.code] || defaultMessage;
    return new Error(message);
  }

  if (error instanceof Error) {
    return error;
  }
  return new Error(defaultMessage);
};

export const userProfileUpdate = async ({
  displayName,
  photoURL,
}: UserProfile) => {
  const user = authService.currentUser;
  if (!user) throw new Error('인증된 유저 정보가 없습니다.');

  try {
    await setDoc(
      doc(db, 'users', user.uid),
      {
        displayName,
        photoURL: photoURL ?? null,
      },
      { merge: true }
    );
  } catch (error: unknown) {
    throw handleProfileError(error, '프로필 업데이트에 실패하였습니다.');
  }
};

const deleteAllUserData = async (uid: string) => {
  const postsRef = collection(db, 'posts');
  // posts 컬렉션 참조 생성;
  const q = query(postsRef, where('authorId', '==', uid));
  // authorId가 현재 uid인 게시글을 조회하는 쿼리 생성 조회, 조건만 생성
  const snapshot = await getDocs(q);
  // 쿼리를 실행하여 조회된 게시글을 가져옴
  const batches = [writeBatch(db)];
  // 첫번째 배치 생성

  let batchIndex = 0;
  let operationCount = 0;

  batches[batchIndex]?.delete(doc(db, 'users', uid));
  // uid에 맞는 문서 삭제 등록
  operationCount++;
  // 삭제 등록이 되어 카운트 증가

  snapshot.forEach((postDoc) => {
    if (operationCount >= 499) {
      batches.push(writeBatch(db));
      batchIndex++;
      operationCount = 0;
    }
    // 배치가 가득 차게 되면 새로운 배치 생성 후 이후 작업은 새 배치에 등록

    batches[batchIndex]?.delete(postDoc.ref);
    operationCount++;
    // 게시글 삭제 작업을 현재 배치에 등록
    // 등록된 작업 수 증가
  });

  await Promise.all(batches.map((batch) => batch.commit()));
  // 모든 배치의 삭제 작업을 동시 진행
};

export const deleteUser = async (password: string) => {
  const user = authService.currentUser;

  if (!user || !user.email) {
    throw new Error('인증된 유저 정보가 없습니다.');
  }

  try {
    const credential = EmailAuthProvider.credential(user.email, password);

    await reauthenticateWithCredential(user, credential);

    await deleteAllUserData(user.uid);

    await firebaseDeleteUser(user);
  } catch (error: unknown) {
    throw handleProfileError(error, '회원탈퇴에 실패하였습니다.');
  }
};
