import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { getUser } from '@/lib/api/user';
import { userKeys } from '@/lib/queries/keys';

export function useUser(userId: string) {
  return useQuery({
    queryKey: userKeys.single(userId),
    queryFn: ({ signal }) => getUser(userId, signal),
    enabled: !!userId,
  });
}

export function useSuspenseUser(userId: string) {
  return useSuspenseQuery({
    queryKey: userKeys.single(userId),
    queryFn: ({ signal }) => getUser(userId, signal),
  });
}
