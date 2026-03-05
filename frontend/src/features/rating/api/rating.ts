import type { ProductReviewsResponse, UserReviewsResponse } from '@/features/rating/types/rating';
import { RATING_SERVICE_URL } from '@/lib/routes';
import { handleResponse } from '@/shared/api/fetch';

export async function getProductReviews(
  productId: number | string,
  signal?: AbortSignal,
): Promise<ProductReviewsResponse> {
  const response = await fetch(`${RATING_SERVICE_URL}/products/${productId}/reviews`, { signal });
  return handleResponse(response);
}

export async function getUserReviews(userId: string, signal?: AbortSignal): Promise<UserReviewsResponse> {
  const response = await fetch(`${RATING_SERVICE_URL}/reviews/user/${userId}`, { signal });
  return handleResponse(response);
}
