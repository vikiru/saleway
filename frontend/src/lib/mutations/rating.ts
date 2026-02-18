import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createRating, deleteRating, updateRating } from '@/lib/api/rating';
import { productRatingsQueryKey, userRatingsQueryKey } from '@/lib/queries/keys';
import type { UserReviewCreate, UserReviewUpdate } from '@/lib/types/rating';

export function useCreateRating() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (review: UserReviewCreate) => createRating(review),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: productRatingsQueryKey(String(variables.productId)) });
      queryClient.invalidateQueries({ queryKey: userRatingsQueryKey(String(variables.userId)) });
    },
  });
}

export function useUpdateRating() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      reviewId,
      productId,
      userId,
      review,
    }: {
      reviewId: number;
      productId: number;
      userId: number;
      review: UserReviewUpdate;
    }) => updateRating(reviewId, review),
    onSuccess: (_, { productId, userId }) => {
      queryClient.invalidateQueries({ queryKey: productRatingsQueryKey(String(productId)) });
      queryClient.invalidateQueries({ queryKey: userRatingsQueryKey(String(userId)) });
    },
  });
}

export function useDeleteRating() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reviewId, productId, userId }: { reviewId: number; productId: number; userId: number }) =>
      deleteRating(reviewId),
    onSuccess: (_, { productId, userId }) => {
      queryClient.invalidateQueries({ queryKey: productRatingsQueryKey(String(productId)) });
      queryClient.invalidateQueries({ queryKey: userRatingsQueryKey(String(userId)) });
    },
  });
}
