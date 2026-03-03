import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { verifySession } from '@/lib/api/payment';
import { paymentVerifyQueryKey } from '@/lib/queries/keys';

export function usePaymentVerify(sessionId: string) {
  return useQuery({
    queryKey: paymentVerifyQueryKey(sessionId),
    queryFn: ({ signal }) => verifySession(sessionId, signal),
    enabled: !!sessionId,
  });
}

export function useSuspensePaymentVerify(sessionId: string) {
  return useSuspenseQuery({
    queryKey: paymentVerifyQueryKey(sessionId),
    queryFn: ({ signal }) => verifySession(sessionId, signal),
  });
}
