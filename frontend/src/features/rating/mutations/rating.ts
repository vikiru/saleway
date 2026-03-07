import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UserReviewCreate, UserReviewUpdate } from '@/features/rating/types/rating';
import { ratingKeys } from '@/lib/queries/keys';
import { createReview, deleteReview, updateReview } from '@/lib/server/actions/reviews';

export function useCreateReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (review: UserReviewCreate) => createReview(review),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ratingKeys.all });
    },
  });
}

export function useUpdateReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ reviewId, review }: { reviewId: number; review: UserReviewUpdate }) =>
      updateReview(reviewId, review),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ratingKeys.all });
    },
  });
}

export function useDeleteReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ reviewId }: { reviewId: number }) => deleteReview(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ratingKeys.all });
    },
  });
}
