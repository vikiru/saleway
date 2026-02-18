import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePassword, updateProfile } from '@/lib/api/user';
import { userQueryKey } from '@/lib/queries/keys';
import type { EcommerceUserUpdate } from '@/lib/types/user';

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, data }: { userId: number; data: Partial<EcommerceUserUpdate> }) =>
      updateProfile(userId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: userQueryKey(String(variables.userId)) });
    },
  });
}

export function useUpdatePassword() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      currentPassword,
      newPassword,
    }: {
      userId: number;
      currentPassword: string;
      newPassword: string;
    }) => updatePassword(userId, currentPassword, newPassword),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}
