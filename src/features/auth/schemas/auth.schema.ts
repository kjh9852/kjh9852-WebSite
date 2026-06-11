import { z } from 'zod';

import {
  displayNameSchema,
  passwordSchema,
  passwordConfirmSchema,
} from '@/schemas/user.schemas';

const emailSchema = z
  .string()
  .nonempty({ message: '이메일을 입력해주세요.' })
  .email({ message: '이메일 형식이 올바르지 않습니다.' });

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signUpSchema = z
  .object({
    displayName: displayNameSchema,
    email: emailSchema,
    password: passwordSchema,
    passwordConfirm: passwordConfirmSchema,
  })
  .refine(
    (data) => {
      if (!data.passwordConfirm) return true;

      return data.password === data.passwordConfirm;
    },
    {
      path: ['passwordConfirm'],
      message: '비밀번호가 일치하지 않습니다.',
    }
  );

export type SignInFormValues = z.infer<typeof signInSchema>;
export type SignUpFormValues = z.infer<typeof signUpSchema>;
