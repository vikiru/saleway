import { useQuery } from '@tanstack/react-query';
import { fetchOrder, fetchUserOrders } from '@/lib/api/order';
import { orderQueryKey, userOrdersQueryKey } from '@/lib/queries/keys';

export function useUserOrders(userId: string) {
  return useQuery({
    queryKey: userOrdersQueryKey(userId),
    queryFn: ({ signal }) => fetchUserOrders(userId, signal),
    enabled: !!userId,
  });
}

export function useOrder(orderId: number) {
  return useQuery({
    queryKey: orderQueryKey(String(orderId)),
    queryFn: ({ signal }) => fetchOrder(orderId, signal),
    enabled: !!orderId,
  });
}
