import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { getCart, getCartItems } from '@/lib/api/cart';
import { cartKeys } from './keys';

export function useCart(userId: string) {
  return useQuery({
    queryKey: cartKeys.all(userId),
    queryFn: ({ signal }) => getCart(userId, signal),
    enabled: !!userId,
  });
}

export function useCartItems(userId: string) {
  return useQuery({
    queryKey: cartKeys.all(userId),
    queryFn: ({ signal }) => getCartItems(userId, signal),
    enabled: !!userId,
  });
}

export function useSuspenseCart(userId: string) {
  return useSuspenseQuery({
    queryKey: cartKeys.all(userId),
    queryFn: ({ signal }) => getCart(userId, signal),
  });
}

export function useSuspenseCartItems(userId: string) {
  return useSuspenseQuery({
    queryKey: cartKeys.all(userId),
    queryFn: ({ signal }) => getCartItems(userId, signal),
  });
}
