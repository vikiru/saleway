import { handleResponse } from '@/lib/api/fetch';
import { RATING_SERVICE_URL } from '@/lib/routes';
import type { ProductReviewsResponse, UserReviewsResponse } from '@/lib/types/rating';

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
