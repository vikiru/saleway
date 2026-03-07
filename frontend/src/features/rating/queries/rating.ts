import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { getProductReviews, getUserReviews } from '@/features/rating/api/rating';
import { ratingKeys } from '@/lib/queries/keys';

export function useProductReviews(productId: string) {
  return useQuery({
    queryKey: ratingKeys.byProduct(productId),
    queryFn: ({ signal }) => getProductReviews(productId, signal),
    enabled: !!productId,
  });
}

export function useUserReviews(userId: string) {
  return useQuery({
    queryKey: ratingKeys.byUser(userId),
    queryFn: ({ signal }) => getUserReviews(userId, signal),
    enabled: !!userId,
  });
}

export function useSuspenseProductReviews(productId: string) {
  return useSuspenseQuery({
    queryKey: ratingKeys.byProduct(productId),
    queryFn: ({ signal }) => getProductReviews(productId, signal),
  });
}

export function useSuspenseUserReviews(userId: string) {
  return useSuspenseQuery({
    queryKey: ratingKeys.byUser(userId),
    queryFn: ({ signal }) => getUserReviews(userId, signal),
  });
}
