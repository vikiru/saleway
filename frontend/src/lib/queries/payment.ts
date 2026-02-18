import { useQuery } from '@tanstack/react-query';
import { verifySession } from '@/lib/api/payment';
import { paymentVerifyQueryKey } from '@/lib/queries/keys';

export function useVerifySession(sessionId: string) {
  return useQuery({
    queryKey: paymentVerifyQueryKey(sessionId),
    queryFn: ({ signal }) => verifySession(sessionId, signal),
    enabled: !!sessionId,
  });
}
