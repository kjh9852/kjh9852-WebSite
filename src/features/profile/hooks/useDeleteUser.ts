import { useQueryClient, useMutation } from '@tanstack/react-query';

import { deleteUser } from '@/features/profile/api/profile';

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (password: string) => deleteUser(password),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['currentUser'] });
    },
  });
}
