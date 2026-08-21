'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { CheckoutSessionRequest, RefundRequest } from '@/entities/payment/types/payment';

import { cartKeys } from '@/entities/cart/queries/keys';
import { orderKeys } from '@/entities/order/queries/keys';
import { createCheckoutAction, processRefundAction } from '@/features/checkout/actions/payment';

export function useCheckout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: CheckoutSessionRequest) => createCheckoutAction(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.all });
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
    },
  });
}

export function useRefund() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: RefundRequest) => processRefundAction(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.all });
    },
  });
}
