import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { ratingKeys } from '@/lib/queries/keys';
import { getProductReviewsAction, getUserReviewsAction } from '@/lib/server/actions/reviews';

export function useProductReviews(productId: string) {
  return useQuery({
    queryKey: ratingKeys.byProduct(productId),
    queryFn: () => getProductReviewsAction(productId),
    enabled: !!productId,
  });
}

export function useUserReviews(userId: string) {
  return useQuery({
    queryKey: ratingKeys.byUser(userId),
    queryFn: () => getUserReviewsAction(userId),
    enabled: !!userId,
  });
}

export function useSuspenseProductReviews(productId: string) {
  return useSuspenseQuery({
    queryKey: ratingKeys.byProduct(productId),
    queryFn: () => getProductReviewsAction(productId),
  });
}

export function useSuspenseUserReviews(userId: string) {
  return useSuspenseQuery({
    queryKey: ratingKeys.byUser(userId),
    queryFn: () => getUserReviewsAction(userId),
  });
}
