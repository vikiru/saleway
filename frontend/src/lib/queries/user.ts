import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '@/lib/api/user';
import { userQueryKey } from '@/lib/queries/keys';

export function useUser(userId: string) {
  return useQuery({
    queryKey: userQueryKey(userId),
    queryFn: ({ signal }) => fetchUser(userId, signal),
    enabled: !!userId,
  });
}
