'use client';

import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import {
  getProductAverageRatingAction,
  getProductReviewsAction,
  getReviewsAction,
  getUserReviewsAction,
} from '@/features/rating/actions/rating';
import type { Review } from '@/features/rating/types/rating';
import { ratingKeys } from '@/lib/queries/keys';

export function useReviews(productId: string, initialData?: Review[]) {
  return useQuery({
    queryKey: ratingKeys.byProduct(productId),
    queryFn: async () => {
      const result = await getReviewsAction(productId);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!productId,
    initialData,
  });
}

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
    queryFn: () => getUserReviewsAction(),
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
    queryFn: () => getUserReviewsAction(),
  });
}

export function useProductAverageRating(productId: string) {
  return useQuery({
    queryKey: ratingKeys.average(productId),
    queryFn: () => getProductAverageRatingAction(productId),
    enabled: !!productId,
  });
}
