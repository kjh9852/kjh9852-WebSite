import { useMutation, useQueryClient } from '@tanstack/react-query';

import { uploadProject } from '@/features/project/api/project';
import { type ProjectFormValues } from '@/features/project/schemas/project.schema';

export function usePostProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ProjectFormValues) => uploadProject(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['project'],
      });
    },
  });
}
