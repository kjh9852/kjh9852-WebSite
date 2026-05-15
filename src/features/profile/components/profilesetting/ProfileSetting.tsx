import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { authService } from '@/api/firebase';
import { uploadImage } from '@/api/uploadImage';
import defaultProfile from '@/assets/icons/profile_icon.png';
import { Button, Input } from '@/components/ui';
import { useAuth } from '@/features/auth';
import { useModalStore } from '@/store/modalStore';
import { useToastStore } from '@/store/toastStore';
import { createImageChangeHandler } from '@/utils/image';

import { useUserUpdate } from '../../hooks/useUserUpdate';
import {
  profileSchema,
  type ProfileSettingValues,
} from '../../schemas/profile.schema';

import styles from './ProfileSetting.module.scss';

export default function ProfileSetting() {
  const queryClient = useQueryClient();
  const { data: user } = useAuth();
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const { openModal, closeModal } = useModalStore();
  const { showToast } = useToastStore();
  const { mutate: profileUpdate, isPending } = useUserUpdate();

  const form = useForm<ProfileSettingValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: user?.displayName ?? '',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (user) {
      form.reset({ displayName: user.displayName ?? '' });
    }
  }, [user, form]);

  const handleUpdateUserProfile = async (data: ProfileSettingValues) => {
    let uploadImageUrl = user?.photoURL;

    if (imageFile) {
      try {
        uploadImageUrl = await uploadImage(imageFile);
      } catch (error) {
        console.error('Upload Error Details:', error);
        showToast({
          type: 'warning',
          message: '이미지 업로드에 실패했습니다.',
        });
        return;
      }
    }

    const updatePayload: Parameters<typeof profileUpdate>[0] = {
      ...data,
    };

    if (uploadImageUrl) {
      updatePayload.photoURL = uploadImageUrl;
    }

    profileUpdate(updatePayload, {
      onSuccess: async () => {
        const updateUser = authService.currentUser;

        if (updateUser) {
          queryClient.setQueryData(['currentUser'], { ...updateUser });
          queryClient.invalidateQueries({
            queryKey: ['users', updateUser.uid],
          });
        }

        showToast({ type: 'success', message: '프로필이 변경되었습니다.' });
        closeModal();
      },
      onError: (error: Error) => {
        showToast({ type: 'warning', message: error.message });
      },
    });
  };

  const handleImageChange = createImageChangeHandler({
    maxSizeMB: 1,
    onValid: (file) => setImageFile(file),
    onError: (message) => showToast({ type: 'warning', message }),
  });

  const previewUrl = useMemo(() => {
    if (!imageFile) return;

    const imagePreview = URL.createObjectURL(imageFile);
    return imagePreview;
  }, [imageFile]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const profileImage = previewUrl || user?.photoURL || defaultProfile;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>프로필 설정</h2>
      <FormProvider {...form}>
        <form
          className={styles.formContainer}
          onSubmit={form.handleSubmit((data) => handleUpdateUserProfile(data))}
        >
          <div>
            <p className={styles.label}>프로필 이미지</p>
            <div className={styles.fileContainer}>
              <label className={styles.fileLabel} htmlFor="profileImage" />
              <input
                className={styles.fileInput}
                type="file"
                id="profileImage"
                name="profileImage"
                onChange={handleImageChange}
              />
              <div className={styles.filePreview}>
                <img
                  className={styles.previewImage}
                  loading="lazy"
                  width={200}
                  height={200}
                  src={profileImage}
                  alt="이미지 미리보기"
                />
              </div>
            </div>
          </div>
          <div className={styles.inputContainer}>
            <Input
              label="닉네임"
              type="text"
              id="displayName"
              placeHolder="닉네임을 입력해주세요"
              showValidationIcon
            />
          </div>
          <div className={styles.buttonContainer}>
            <Button
              variant="submit"
              disabled={!form.formState.isValid || isPending}
              type="submit"
            >
              {isPending ? '변경 중...' : '완료'}
            </Button>
            <Button
              variant="warning"
              onClick={() => openModal('withdrawal')}
              type="button"
            >
              회원탈퇴
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
