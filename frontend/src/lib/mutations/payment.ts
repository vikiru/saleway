import { useMutation } from '@tanstack/react-query';
import { createCheckout, processRefund } from '@/lib/api/payment';
import type { CheckoutSessionRequest, RefundRequest } from '@/lib/types/payment';

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
