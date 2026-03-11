import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { paymentKeys } from '@/lib/queries/keys';
import { verifySessionAction } from '@/lib/server/actions/payments';

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
