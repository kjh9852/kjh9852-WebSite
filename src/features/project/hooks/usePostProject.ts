import { useMutation } from '@tanstack/react-query';

import { uploadProject } from '@/features/project/api/project';
import { type ProjectFormValues } from '@/features/project/schemas/project.schema';

export function usePostProject() {
  return useMutation({
    mutationFn: (data: ProjectFormValues) => uploadProject(data),
  });
}
