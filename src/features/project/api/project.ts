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

export async function uploadProject(data: ProjectFormValues): Promise<void> {
  await addDoc(collection(db, 'project'), {
    ...data,
  });
}

export async function getProjects(
  category: string = 'all'
): Promise<Project[]> {
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
}

export async function getProject(projectId: string): Promise<Project | null> {
  const projectRef = doc(db, 'project', projectId);
  try {
    const response = await getDoc(projectRef);
    if (response.exists()) {
      console.log(response.data());
      return { id: response.id, ...response.data() } as Project;
    }
    return null;
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      const message = FIREBASE_FIRESTORE_MESSAGES[error.code];
      throw new Error(message);
    }
    throw error;
  }
}

export async function editProject({
  projectId,
  updateProject,
}: EditProjectVariables): Promise<void> {
  const projectRef = doc(db, 'project', projectId);
  try {
    await updateDoc(projectRef, updateProject);
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      const message = FIREBASE_FIRESTORE_MESSAGES[error.code];
      console.log(message);
      throw new Error(message);
    }
    throw error;
  }
}

export async function deleteProject(projectId: string): Promise<void> {
  const projectRef = doc(db, 'project', projectId);
  try {
    await deleteDoc(projectRef);
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      const message = FIREBASE_FIRESTORE_MESSAGES[error.code];
      console.log(message);
      throw new Error(message);
    }
    throw error;
  }
}
