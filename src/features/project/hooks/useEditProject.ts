import { useMutation, useQueryClient } from '@tanstack/react-query';

import { editProject } from '../api/project';

export function useEditProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editProject,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['project'],
      });
    },
  });
}
