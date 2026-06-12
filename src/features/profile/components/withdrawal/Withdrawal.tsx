import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import { Button, Input } from '@/components/ui';
import { useModalStore } from '@/store/modalStore';
import { useToastStore } from '@/store/toastStore';

import { useDeleteUser } from '../../hooks/useDeleteUser';
import {
  deleteUserSchema,
  type WithdrawFormValues,
} from '../../schemas/profile.schema';

import styles from './Withdrawal.module.scss';

export default function Withdrawal() {
  const showToast = useToastStore((state) => state.showToast);
  const closeModal = useModalStore((state) => state.closeModal);
  const { mutate: withdraw } = useDeleteUser();
  const form = useForm<WithdrawFormValues>({
    resolver: zodResolver(deleteUserSchema),
    defaultValues: {
      password: '',
      passwordConfirm: '',
    },
    mode: 'onChange',
  });

  const handleDeleteUser = (data: WithdrawFormValues) => {
    withdraw(data.password, {
      onSuccess: () => {
        showToast({ type: 'success', message: '정상적으로 탈퇴 되었습니다.' });
        closeModal();
      },
      onError: (error: Error) => {
        showToast({ type: 'warning', message: error.message });
      },
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>회원탈퇴</h2>
      <FormProvider {...form}>
        <form
          className={styles.formContainer}
          onSubmit={form.handleSubmit((data) => handleDeleteUser(data))}
        >
          <div className={styles.inputContainer}>
            <Input
              label="비밀번호"
              type="password"
              id="password"
              placeHolder="비밀번호를 입력해주세요"
              isPassword
              showValidationIcon
              registerOptions={{ deps: ['passwordConfirm'] }}
            />
          </div>
          <div className={styles.inputContainer}>
            <Input
              label="비밀번호 확인"
              type="password"
              id="passwordConfirm"
              placeHolder="비밀번호를 다시 한 번 입력해주세요"
              isPassword
              showValidationIcon
            />
          </div>
          <div className={styles.buttonContainer}>
            <Button
              type="submit"
              size="full"
              variant="warning"
              disabled={!form.formState.isValid}
            >
              회원탈퇴
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
