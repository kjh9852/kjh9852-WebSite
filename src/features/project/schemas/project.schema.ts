import { z } from 'zod';

import { PROJECT_CATEGORY } from '@/constants/projectCategory';

const titleSchema = z.string().nonempty({ message: '제목을 입력해주세요.' });

const descriptionSchema = z.string().refine(
  (val) => {
    const plainText = val.replace(/<[^>]*>/g, '').trim();

    const hasIconLink =
      val.includes('data-icon-link="true"') || val.includes('<a ');

    return plainText.length > 0 || hasIconLink;
  },
  {
    message: '내용을 입력해주세요.',
  }
);

const categoryValues = PROJECT_CATEGORY.map((c) => c.type) as [
  string,
  ...string[],
];

const categorySchema = z.enum(categoryValues);

export const projectSchema = z.object({
  title: titleSchema,
  description: descriptionSchema,
  category: categorySchema,
  imageURL: z.string().optional(),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;

export type Project = ProjectFormValues & { id: string };

export type UpdateProjectValues = Partial<ProjectFormValues>;
