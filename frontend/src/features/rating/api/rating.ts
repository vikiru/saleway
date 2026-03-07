import type { UserReview } from '@/features/rating/types/rating';
import { RATING_SERVICE_URL } from '@/lib/constants/routes';
import { handleResponse } from '@/shared/api/fetch';

export interface ProductReviewsData {
  reviews: UserReview[];
  averageRating: number;
  totalReviews: number;
}

export interface UserReviewsData {
  reviews: UserReview[];
  totalReviews: number;
}

export async function getProductReviews(productId: number | string, signal?: AbortSignal): Promise<ProductReviewsData> {
  const response = await fetch(`${RATING_SERVICE_URL}/products/${productId}/reviews`, { signal });
  return handleResponse<ProductReviewsData>(response);
}

export async function getUserReviews(userId: string, signal?: AbortSignal): Promise<UserReviewsData> {
  const response = await fetch(`${RATING_SERVICE_URL}/reviews/user/${userId}`, { signal });
  return handleResponse<UserReviewsData>(response);
}
