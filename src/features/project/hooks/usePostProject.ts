import { useMutation, useQueryClient } from '@tanstack/react-query';

import { uploadProject } from '../api/project';
import { type ProjectFormValues } from '../schemas/project.schema';

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
