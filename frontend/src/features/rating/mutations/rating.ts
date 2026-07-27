import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createReviewAction, deleteReviewAction, updateReviewAction } from '@/features/rating/actions/rating';
import type { ReviewCreate, ReviewUpdate } from '@/features/rating/types/rating';
import { ratingKeys } from '@/lib/queries/keys';

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
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ratingKeys.byProduct(String(variables.product_id)),
      });
    },
  });
}

export function useUpdateReview(productId?: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ reviewId, data }: { reviewId: number; data: ReviewUpdate }) => {
      // If productId is not provided to the hook, we might need it in the mutation input,
      // but the current action expects it as a number.
      const result = await updateReviewAction(Number(productId), reviewId, data);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    onSuccess: () => {
      if (productId) {
        queryClient.invalidateQueries({ queryKey: ratingKeys.byProduct(productId) });
      } else {
        queryClient.invalidateQueries({ queryKey: ratingKeys.all });
      }
    },
  });
}

export function useDeleteReview(productId?: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (reviewId: number) => {
      const result = await deleteReviewAction(Number(productId), reviewId);
      if (!result.success) {
        throw new Error(result.error);
      }
    },
    onSuccess: () => {
      if (productId) {
        queryClient.invalidateQueries({ queryKey: ratingKeys.byProduct(productId) });
      } else {
        queryClient.invalidateQueries({ queryKey: ratingKeys.all });
      }
    },
  });
}
