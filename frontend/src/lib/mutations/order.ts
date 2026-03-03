import { useMutation } from '@tanstack/react-query';
import { cancelOrder, createOrder } from '@/lib/server/actions/orders';
import type { OrderCreate } from '@/lib/types/order';

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
