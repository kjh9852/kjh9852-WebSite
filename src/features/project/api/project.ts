import { FirebaseError } from 'firebase/app';
import {
  addDoc,
  deleteDoc,
  updateDoc,
  getDocs,
  collection,
  query,
  where,
  doc,
  getDoc,
} from 'firebase/firestore';

import { db } from '@/api/firebase';
import { FIREBASE_FIRESTORE_MESSAGES } from '@/constants/firebaseMessage';

import {
  type ProjectFormValues,
  type Project,
} from '../schemas/project.schema';
import type { EditProjectVariables } from '../types';

const handleProjectError = (error: unknown, defaultMessage: string) => {
  if (error instanceof FirebaseError) {
    const message = FIREBASE_FIRESTORE_MESSAGES[error.code] || defaultMessage;
    return new Error(message);
  }
  if (error instanceof Error) {
    return error;
  }
  return new Error(defaultMessage);
};

export async function uploadProject(data: ProjectFormValues): Promise<void> {
  try {
    await addDoc(collection(db, 'project'), {
      ...data,
    });
  } catch (error: unknown) {
    throw handleProjectError(error, '프로젝트 업로드 중 오류가 발생했습니다.');
  }
}

export async function getProjects(
  category: string = 'all'
): Promise<Project[]> {
  try {
    let q;
    if (category === 'all') {
      q = query(collection(db, 'project'));
    } else {
      q = query(collection(db, 'project'), where('category', '==', category));
    }
    const response = await getDocs(q);
    const returnData = response.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Project[];

    return returnData;
  } catch (error: unknown) {
    throw handleProjectError(
      error,
      '프로젝트 리스트를 불러오는 중 오류가 발생했습니다.'
    );
  }
}

export async function getProject(projectId: string): Promise<Project | null> {
  try {
    const projectRef = doc(db, 'project', projectId);
    const response = await getDoc(projectRef);
    if (!response.exists()) return null;
    return { id: response.id, ...response.data() } as Project;
  } catch (error: unknown) {
    throw handleProjectError(
      error,
      '프로젝트를 불러오는 중 오류가 발생했습니다.'
    );
  }
}

export async function editProject({
  projectId,
  updateProject,
}: EditProjectVariables): Promise<void> {
  try {
    const projectRef = doc(db, 'project', projectId);
    await updateDoc(projectRef, updateProject);
  } catch (error: unknown) {
    throw handleProjectError(error, '프로젝트 수정 중 오류가 발생했습니다.');
  }
}

export async function deleteProject(projectId: string): Promise<void> {
  try {
    const projectRef = doc(db, 'project', projectId);
    await deleteDoc(projectRef);
  } catch (error: unknown) {
    throw handleProjectError(error, '프로젝트 삭제 중 오류가 발생했습니다.');
  }
}
