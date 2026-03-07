import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { verifySession } from '@/features/payment/api/payment';
import { paymentKeys } from '@/lib/queries/keys';

export function usePaymentVerify(sessionId: string) {
  return useQuery({
    queryKey: paymentKeys.verify(sessionId),
    queryFn: ({ signal }) => verifySession(sessionId, signal),
    enabled: !!sessionId,
  });
}

export function useSuspensePaymentVerify(sessionId: string) {
  return useSuspenseQuery({
    queryKey: paymentKeys.verify(sessionId),
    queryFn: ({ signal }) => verifySession(sessionId, signal),
  });
}
