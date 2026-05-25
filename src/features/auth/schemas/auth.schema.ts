import { z } from 'zod';

import { displayNameSchema } from '@/schemas/user';

const emailSchema = z
  .string()
  .nonempty({ message: '이메일을 입력해주세요.' })
  .email({ message: '이메일 형식이 올바르지 않습니다.' });

const passwordSchema = z
  .string()
  .nonempty({ message: '비밀번호를 입력해주세요.' })
  .min(8, { message: '비밀번호를 8자 이상 입력해주세요.' });

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signUpSchema = z
  .object({
    displayName: displayNameSchema,
    email: emailSchema,
    password: passwordSchema,
    passwordConfirm: z
      .string()
      .nonempty({ message: '비밀번호 확인을 입력해주세요.' })
      .min(8, { message: '비밀번호를 8자 이상 입력해주세요.' }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: '비밀번호가 일치하지 않습니다.',
  });

export type SignInFormValues = z.infer<typeof signInSchema>;
export type SignUpFormValues = z.infer<typeof signUpSchema>;
