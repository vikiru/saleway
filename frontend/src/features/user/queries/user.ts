import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { userKeys } from '@/lib/queries/keys';
import { getUserAction } from '@/lib/server/actions/users';

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
