'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { EcommerceUserCreate, EcommerceUserUpdate } from '@/entities/user/types/user';

import { userKeys } from '@/entities/user/queries/keys';
import { createUser, updateUser } from '@/features/user/actions/user';

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: EcommerceUserCreate) => createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: { userId: string; data: Partial<EcommerceUserUpdate> }) => updateUser(data),
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: userKeys.single(userId) });
    },
  });
}
