import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser, updateProfile } from '@/lib/api/user';
import { userQueryKey } from '@/lib/queries/keys';
import type { EcommerceUserCreate, EcommerceUserUpdate } from '@/lib/types/user';

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: EcommerceUserCreate) => createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: Partial<EcommerceUserUpdate> }) =>
      updateProfile(userId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: userQueryKey(variables.userId) });
    },
  });
}
