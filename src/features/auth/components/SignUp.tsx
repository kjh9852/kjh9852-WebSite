import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useState, useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { uploadImage } from '@/api/uploadImage';
import defaultProfile from '@/assets/icons/profile_icon.png';
import { Button, Input } from '@/components/ui';
import { useModalStore } from '@/store/modalStore';
import { useToastStore } from '@/store/toastStore';
import { createImageChangeHandler } from '@/utils/image';

import { useSignUp } from '../hooks/useSignUp';
import { signUpSchema, type SignUpFormValues } from '../schemas/auth.schema';

import styles from './AuthForm.module.scss';

export default function SignUp() {
  const queryClient = useQueryClient();
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      displayName: '',
    },
    mode: 'onChange',
  });
  const { showToast } = useToastStore();
  const { openModal, closeModal } = useModalStore();
  const { mutate: signUp } = useSignUp();
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);

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

  const handleSubmitSignUp = async (data: SignUpFormValues) => {
    let uploadImageUrl;

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

    const updatePayload = {
      email: data.email,
      password: data.password,
      displayName: data.displayName,
      photoURL: uploadImageUrl || '',
    };

    signUp(updatePayload, {
      onSuccess: async (newUser) => {
        if (newUser) {
          await queryClient.setQueryData(['currentUser'], {
            uid: newUser.uid,
            email: newUser.email,
            displayName: newUser.displayName,
            photoURL: newUser.photoURL,
            isAdmin: false,
          });
        }
        showToast({ type: 'success', message: '회원가입 되었습니다.' });
        closeModal();
      },
      onError: (error: Error) => {
        const message = error.message ?? '알 수 없는 오류가 발생했습니다.';
        showToast({ type: 'warning', message });
      },
    });
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>회원가입</h2>
      <FormProvider {...form}>
        <form
          className={styles.formContainer}
          onSubmit={form.handleSubmit((data) => handleSubmitSignUp(data))}
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
                  width={200}
                  height={200}
                  src={previewUrl ? previewUrl : defaultProfile}
                  alt="이미지 미리보기"
                />
              </div>
            </div>
          </div>
          <div className={styles.inputContainer}>
            <Input
              label="이메일"
              type="email"
              id="email"
              placeHolder="이메일을 입력해 주세요"
              showValidationIcon
            />
          </div>
          <div className={styles.inputContainer}>
            <Input
              label="닉네임"
              type="text"
              id="displayName"
              placeHolder="닉네임을 입력해 주세요"
              showValidationIcon
            />
          </div>
          <div className={styles.inputContainer}>
            <Input
              label="비밀번호"
              type="password"
              id="password"
              placeHolder="비밀번호를 입력해 주세요"
              isPassword
              showValidationIcon
            />
          </div>
          <div className={styles.inputContainer}>
            <Input
              label="비밀번호 확인"
              type="password"
              id="passwordConfirm"
              placeHolder="비밀번호를 다시 한번 입력해 주세요"
              isPassword
              showValidationIcon
            />
          </div>
          <div className={styles.buttonContainer}>
            <Button
              size="full"
              variant="submit"
              type="submit"
              disabled={!form.formState.isValid}
            >
              회원가입
            </Button>
          </div>
        </form>
      </FormProvider>
      <div>
        <Button variant="underline" onClick={() => openModal('signIn')}>
          로그인
        </Button>
      </div>
    </div>
  );
}
