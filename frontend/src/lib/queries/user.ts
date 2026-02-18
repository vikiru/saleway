import { useQuery } from '@tanstack/react-query';
import { fetchCurrentUser, fetchUser } from '@/lib/api/user';
import { currentUserQueryKey, userQueryKey } from '@/lib/queries/keys';

export function useCurrentUser(userId: string) {
  return useQuery({
    queryKey: currentUserQueryKey(userId),
    queryFn: ({ signal }) => fetchCurrentUser(signal),
    enabled: !!userId,
  });
}

export function useUser(userId: number) {
  return useQuery({
    queryKey: userQueryKey(String(userId)),
    queryFn: ({ signal }) => fetchUser(userId, signal),
    enabled: !!userId,
  });
}
