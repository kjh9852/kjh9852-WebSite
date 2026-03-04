import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button, Input } from '@/components/ui';
import { useSignIn } from '@/features/auth/hooks/useSignIn';
import { signInSchema } from '@/features/auth/schemas/auth.schema';
import { useModalStore } from '@/store/modalStore';
import { useToastStore } from '@/store/toastStore';

import styles from './AuthForm.module.scss';

type SignInFormValues = z.infer<typeof signInSchema>;

export default function SignIn() {
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });
  const queryClient = useQueryClient();
  const { mutate: login } = useSignIn();
  const { openModal, closeModal } = useModalStore();
  const { showToast } = useToastStore();

  const handleLogin = (data: SignInFormValues) => {
    login(data, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['currentUser'] });
        showToast({ type: 'success', message: '로그인 되었습니다.' });
        closeModal();
      },
      onError: (error: Error) => {
        const message = error.message ?? '알 수 없는 오류가 발생했습니다.';
        showToast({ type: 'warning', message });
      },
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>로그인</h2>
      <FormProvider {...form}>
        <form
          className={styles.formContainer}
          onSubmit={form.handleSubmit(handleLogin)}
        >
          <div className={styles.inputContainer}>
            <Input
              label="이메일"
              type="email"
              id="email"
              placeHolder="이메일을 입력해주세요"
            />
          </div>
          <div className={styles.inputContainer}>
            <Input
              label="비밀번호"
              type="password"
              id="password"
              placeHolder="비밀번호를 입력해주세요"
              isPassword
            />
          </div>
          <div className={styles.buttonContainer}>
            <Button
              size="full"
              variant="submit"
              disabled={!form.formState.isValid}
            >
              로그인
            </Button>
          </div>
        </form>
      </FormProvider>
      <div>
        <Button variant="underline" onClick={() => openModal('signUp')}>
          회원가입 하기
        </Button>
      </div>
    </div>
  );
}
