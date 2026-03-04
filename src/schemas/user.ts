import { z } from 'zod';

export const displayNameSchema = z
  .string()
  .nonempty({ message: '닉네임을 입력해주세요.' })
  .min(3, { message: '닉네임을 3자 이상 입력해주세요' })
  .max(8, { message: '닉네임을 8자 이내로 입력해주세요' });

export const passwordSchema = z
  .string()
  .nonempty({ message: '비밀번호를 입력해주세요.' })
  .min(8, { message: '비밀번호를 8자 이상 입력해주세요.' });
