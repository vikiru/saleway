'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createOrder, deleteOrderAction, updateOrderStatusAction } from '@/features/order/actions/order';
import type { OrderCreate } from '@/features/order/types/order';
import { orderKeys } from '@/lib/queries/keys';

export function useCreateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (order: OrderCreate) => {
      const result = await createOrder(order);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.all });
    },
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ orderId, status }: { orderId: number; status: string }) => {
      const result = await updateOrderStatusAction(orderId, status);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.all });
    },
  });
}

export function useDeleteOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ orderId }: { orderId: number }) => {
      const result = await deleteOrderAction(orderId);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.all });
    },
  });
}
