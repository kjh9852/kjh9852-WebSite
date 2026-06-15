import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteProject } from '@/features/project/api/project';

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId: string) => deleteProject(projectId),
    onSuccess: (projectId) => {
      queryClient.invalidateQueries({
        queryKey: ['project'],
      });
      queryClient.removeQueries({
        queryKey: ['project', projectId],
      });
    },
  });
}
