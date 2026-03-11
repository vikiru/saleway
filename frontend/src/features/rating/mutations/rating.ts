import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ReviewUpdate } from '@/features/product/api/rating';
import type { ReviewCreate } from '@/features/product/types/product';
import { ratingKeys } from '@/lib/queries/keys';
import { createReviewAction, deleteReviewAction, updateReviewAction } from '@/lib/server/actions/reviews';

export function useCreateReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (review: ReviewCreate) => {
      const result = await createReviewAction(review);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ratingKeys.all });
    },
  });
}

export function useUpdateReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ productId, reviewId, data }: { productId: number; reviewId: number; data: ReviewUpdate }) => {
      const result = await updateReviewAction(productId, reviewId, data);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ratingKeys.all });
    },
  });
}

export function useDeleteReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ productId, reviewId }: { productId: number; reviewId: number }) => {
      const result = await deleteReviewAction(productId, reviewId);
      if (!result.success) {
        throw new Error(result.error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ratingKeys.all });
    },
  });
}
