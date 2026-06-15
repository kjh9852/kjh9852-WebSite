import { z } from 'zod';

import {
  displayNameSchema,
  passwordSchema,
  passwordConfirmSchema,
} from '@/schemas/user.schemas';

export const profileSchema = z.object({
  displayName: displayNameSchema,
});

export const deleteUserSchema = z
  .object({
    password: passwordSchema,
    passwordConfirm: passwordConfirmSchema,
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: '비밀번호가 일치하지 않습니다.',
  });

export type ProfileSettingValues = z.infer<typeof profileSchema>;

export type WithdrawFormValues = z.infer<typeof deleteUserSchema>;
