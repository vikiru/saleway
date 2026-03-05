import { useMutation } from '@tanstack/react-query';
import { createCheckout, processRefund } from '@/features/payment/api/payment';
import type { CheckoutSessionRequest, RefundRequest } from '@/features/payment/types/payment';

export function useCheckout() {
  return useMutation({
    mutationFn: (request: CheckoutSessionRequest) => createCheckout(request),
  });
}

export function useRefund() {
  return useMutation({
    mutationFn: (request: RefundRequest) => processRefund(request),
  });
}
