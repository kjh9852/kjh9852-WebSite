import z from 'zod';

const contentSchema = z
  .string()
  .nonempty({ message: '내용을 입력해주세요.' })
  .max(255, { message: '255자 이내로 작성해주세요.' });

export const postSchema = z.object({
  content: contentSchema,
});

export type PostFormValues = z.infer<typeof postSchema>;
