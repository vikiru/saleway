'use client';

import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { paymentKeys } from '@/entities/payment/queries/keys';
import { verifySessionAction } from '@/features/checkout/actions/payment';

export function usePaymentVerify(sessionId: string) {
  return useQuery({
    queryKey: paymentKeys.verify(sessionId),
    queryFn: () => verifySessionAction(sessionId),
    enabled: !!sessionId,
  });
}

export function useSuspensePaymentVerify(sessionId: string) {
  return useSuspenseQuery({
    queryKey: paymentKeys.verify(sessionId),
    queryFn: () => verifySessionAction(sessionId),
  });
}
