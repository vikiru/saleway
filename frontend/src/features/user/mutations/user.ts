import { useMutation } from '@tanstack/react-query';
import type { EcommerceUserCreate, EcommerceUserUpdate } from '@/features/user/types/user';
import { createUser, updateUser } from '@/lib/server/actions/users';

export function useCreateUser() {
  return useMutation({
    mutationFn: (data: EcommerceUserCreate) => createUser(data),
  });
}

export function useUpdateUser() {
  return useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: Partial<EcommerceUserUpdate> }) => updateUser(userId, data),
  });
}
