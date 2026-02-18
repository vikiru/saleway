import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelOrder, createOrder } from '@/lib/api/order';
import { orderQueryKey, userOrdersQueryKey } from '@/lib/queries/keys';
import type { OrderCreate } from '@/lib/types/order';

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (order: OrderCreate) => createOrder(order),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: userOrdersQueryKey(String(variables.userId)) });
    },
  });
}

export function useCancelOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, userId }: { orderId: number; userId: number }) => cancelOrder(orderId),
    onSuccess: (_, { orderId, userId }) => {
      queryClient.invalidateQueries({ queryKey: orderQueryKey(String(orderId)) });
      queryClient.invalidateQueries({ queryKey: userOrdersQueryKey(String(userId)) });
    },
  });
}
