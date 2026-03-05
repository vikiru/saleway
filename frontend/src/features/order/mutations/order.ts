import { useMutation } from '@tanstack/react-query';
import type { OrderCreate } from '@/features/order/types/order';
import { cancelOrder, createOrder } from '@/lib/server/actions/orders';

export function useCreateOrder() {
  return useMutation({
    mutationFn: (order: OrderCreate) => createOrder(order),
  });
}

export function useCancelOrder() {
  return useMutation({
    mutationFn: ({ orderId }: { orderId: number }) => cancelOrder(orderId),
  });
}
