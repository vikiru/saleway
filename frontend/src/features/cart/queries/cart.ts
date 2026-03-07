import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { getCart, getCartItems } from '@/features/cart/api/cart';
import { cartKeys } from '@/lib/queries/keys';

export function useCart(userId: string) {
  return useQuery({
    queryKey: cartKeys.single(userId),
    queryFn: ({ signal }) => getCart(userId, signal),
    enabled: !!userId,
  });
}

export function useCartItems(userId: string) {
  return useQuery({
    queryKey: [...cartKeys.single(userId), 'items'] as const,
    queryFn: ({ signal }) => getCartItems(userId, signal),
    enabled: !!userId,
  });
}

export function useSuspenseCart(userId: string) {
  return useSuspenseQuery({
    queryKey: cartKeys.single(userId),
    queryFn: ({ signal }) => getCart(userId, signal),
  });
}

export function useSuspenseCartItems(userId: string) {
  return useSuspenseQuery({
    queryKey: [...cartKeys.single(userId), 'items'] as const,
    queryFn: ({ signal }) => getCartItems(userId, signal),
  });
}
