import { useQuery } from '@tanstack/react-query';
import { fetchProductRatings, fetchUserRatings } from '@/lib/api/rating';
import { productRatingsQueryKey, userRatingsQueryKey } from '@/lib/queries/keys';

export function useProductRatings(productId: number) {
  return useQuery({
    queryKey: productRatingsQueryKey(String(productId)),
    queryFn: ({ signal }) => fetchProductRatings(productId, signal),
    enabled: !!productId,
  });
}

export function useUserRatings(userId: number) {
  return useQuery({
    queryKey: userRatingsQueryKey(String(userId)),
    queryFn: ({ signal }) => fetchUserRatings(userId, signal),
    enabled: !!userId,
  });
}
