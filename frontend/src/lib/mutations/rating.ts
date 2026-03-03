import { useMutation } from '@tanstack/react-query';
import { createReview, deleteReview, updateReview } from '@/lib/server/actions/reviews';
import type { UserReviewCreate, UserReviewUpdate } from '@/lib/types/rating';

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
