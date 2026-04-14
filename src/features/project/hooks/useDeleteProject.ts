import { useMutation } from '@tanstack/react-query';

import { deleteProject } from '@/features/project/api/project';

export function useDeleteProject() {
  return useMutation({
    mutationFn: (projectId: string) => deleteProject(projectId),
  });
}
