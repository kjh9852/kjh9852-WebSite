import { z } from 'zod';

import { displayNameSchema, passwordSchema } from '@/schemas/user';

export const profileSchema = z.object({
  displayName: displayNameSchema,
});

export const deleteUserSchema = z
  .object({
    password: passwordSchema,
    passwordConfirm: z
      .string()
      .nonempty({ message: '비밀번호 확인을 입력해주세요.' }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: '비밀번호가 일치하지 않습니다.',
  });
