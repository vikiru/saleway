import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCheckoutAction, processRefundAction } from '@/features/payment/actions/payment';
import type { CheckoutSessionRequest, RefundRequest } from '@/features/payment/types/payment';
import { cartKeys, orderKeys } from '@/lib/queries/keys';

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
