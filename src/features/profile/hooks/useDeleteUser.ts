import { useMutation } from '@tanstack/react-query';

import { deleteUser } from '../api/profile';

export function useDeleteUser() {
  return useMutation({
    mutationFn: (password: string) => deleteUser(password),
  });
}
