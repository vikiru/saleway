import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { getOrderAction, getOrdersAction } from '@/features/order/actions/order';
import { orderKeys } from '@/lib/queries/keys';

export function useOrder(orderId: string) {
  return useQuery({
    queryKey: orderKeys.detail(orderId),
    queryFn: () => getOrderAction(orderId),
    enabled: !!orderId,
  });
}

export function useOrders(userId: string) {
  return useQuery({
    queryKey: orderKeys.byUser(userId),
    queryFn: () => getOrdersAction(userId),
    enabled: !!userId,
  });
}

export function useSuspenseOrder(orderId: string) {
  return useSuspenseQuery({
    queryKey: orderKeys.detail(orderId),
    queryFn: () => getOrderAction(orderId),
  });
}

export function useSuspenseOrders(userId: string) {
  return useSuspenseQuery({
    queryKey: orderKeys.byUser(userId),
    queryFn: () => getOrdersAction(userId),
  });
}
