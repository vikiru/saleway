import { useMutation } from '@tanstack/react-query';
import type { UserReviewCreate, UserReviewUpdate } from '@/features/rating/types/rating';
import { createReview, deleteReview, updateReview } from '@/lib/server/actions/reviews';

export function useCreateReview() {
  return useMutation({
    mutationFn: (review: UserReviewCreate) => createReview(review),
  });
}

export function useUpdateReview() {
  return useMutation({
    mutationFn: ({ reviewId, review }: { reviewId: number; review: UserReviewUpdate }) =>
      updateReview(reviewId, review),
  });
}

export function useDeleteReview() {
  return useMutation({
    mutationFn: ({ reviewId }: { reviewId: number }) => deleteReview(reviewId),
  });
}
