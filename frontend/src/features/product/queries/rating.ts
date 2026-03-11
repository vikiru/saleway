import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { ReviewUpdate } from '@/features/product/api/rating';
import type { ReviewCreate } from '@/features/product/types/product';
import { ratingKeys } from '@/lib/queries/keys';
import {
  createReviewAction,
  deleteReviewAction,
  getReviewsAction,
  updateReviewAction,
} from '@/lib/server/actions/reviews';

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

export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ReviewCreate) => {
      const result = await createReviewAction(data);
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

export function useUpdateReview(productId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ reviewId, data }: { reviewId: number; data: ReviewUpdate }) => {
      const result = await updateReviewAction(Number(productId), reviewId, data);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ratingKeys.byProduct(productId) });
    },
  });
}

export function useDeleteReview(productId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reviewId: number) => {
      const result = await deleteReviewAction(Number(productId), reviewId);
      if (!result.success) throw new Error(result.error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ratingKeys.byProduct(productId) });
    },
  });
}
