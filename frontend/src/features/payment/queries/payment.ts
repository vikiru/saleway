'use client';

import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { verifySessionAction } from '@/features/payment/actions/payment';
import { paymentKeys } from '@/lib/queries/keys';

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
