import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { OrderCreate } from '@/features/order/types/order';
import { cancelOrder, createOrder } from '@/lib/server/actions/orders';
import { orderKeys } from '@/lib/queries/keys';

export function useCreateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (order: OrderCreate) => createOrder(order),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.all });
    },
  });
}

export function useCancelOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ orderId }: { orderId: number }) => cancelOrder(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.all });
    },
  });
}
