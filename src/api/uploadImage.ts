import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { storage } from './firebase';

export const uploadImage = async (file: File): Promise<string | undefined> => {
  const storageRef = ref(storage, 'images/' + file.name);
  try {
    await uploadBytes(storageRef, file);
    const imageUrl = await getDownloadURL(storageRef);
    return imageUrl;
  } catch (error) {
    console.error('Firebase Upload Error:', error);
    throw error;
  }
};
