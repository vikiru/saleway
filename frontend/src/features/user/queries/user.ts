'use client';

import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { getUserAction } from '@/features/user/actions/users';
import { userKeys } from '@/lib/queries/keys';

export function useUser(userId: string) {
  return useQuery({
    queryKey: userKeys.single(userId),
    queryFn: () => getUserAction(userId),
    enabled: !!userId,
  });
}

export function useSuspenseUser(userId: string) {
  return useSuspenseQuery({
    queryKey: userKeys.single(userId),
    queryFn: () => getUserAction(userId),
  });
}
