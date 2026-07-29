'use client';

import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { getCartAction } from '@/features/cart/actions/cart';
import { cartKeys } from '@/lib/queries/keys';

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
