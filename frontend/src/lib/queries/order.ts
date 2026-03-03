import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { getOrder, getOrders } from '@/lib/api/order';
import { orderKeys } from '@/lib/queries/keys';

export function useOrder(orderId: string) {
  return useQuery({
    queryKey: orderKeys.single(orderId),
    queryFn: ({ signal }) => getOrder(orderId, signal),
    enabled: !!orderId,
  });
}

export function useOrders(userId: string) {
  return useQuery({
    queryKey: orderKeys.byUser(userId),
    queryFn: ({ signal }) => getOrders(userId, signal),
    enabled: !!userId,
  });
}

export function useSuspenseOrder(orderId: string) {
  return useSuspenseQuery({
    queryKey: orderKeys.single(orderId),
    queryFn: ({ signal }) => getOrder(orderId, signal),
  });
}

export function useSuspenseOrders(userId: string) {
  return useSuspenseQuery({
    queryKey: orderKeys.byUser(userId),
    queryFn: ({ signal }) => getOrders(userId, signal),
  });
}
