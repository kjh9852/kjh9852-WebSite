import { useMutation, useQueryClient } from '@tanstack/react-query';

import { editProject } from '@/features/project/api/project';
import { type ProjectFormValues } from '@/features/project/schemas/project.schema';

interface EditProjectVariables {
  projectId: string;
  data: ProjectFormValues;
}

export function useEditProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, data }: EditProjectVariables) =>
      editProject(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['project'],
      });
    },
  });
}
