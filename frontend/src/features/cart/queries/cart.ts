import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { cartKeys } from '@/lib/queries/keys';
import { getCartAction } from '@/lib/server/actions/carts';

export function useCart(userId: string) {
  return useQuery({
    queryKey: cartKeys.single(userId),
    queryFn: () => getCartAction(userId),
    enabled: !!userId,
  });
}

export function useSuspenseCart(userId: string) {
  return useSuspenseQuery({
    queryKey: cartKeys.single(userId),
    queryFn: () => getCartAction(userId),
  });
}
