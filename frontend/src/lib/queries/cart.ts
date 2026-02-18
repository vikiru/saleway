import { useQuery } from '@tanstack/react-query';
import { fetchCart, fetchCartItems } from '@/lib/api/cart';
import { cartItemsQueryKey, cartQueryKey } from '@/lib/queries/keys';

export function useCart(userId: string) {
  return useQuery({
    queryKey: cartQueryKey(userId),
    queryFn: ({ signal }) => fetchCart(userId, signal),
    enabled: !!userId,
  });
}

export function useCartItems(userId: string) {
  return useQuery({
    queryKey: cartItemsQueryKey(userId),
    queryFn: ({ signal }) => fetchCartItems(userId, signal),
    enabled: !!userId,
  });
}
