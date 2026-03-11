import type { Review, ReviewCreate } from '@/features/product/types/product';
import { RATING_SERVICE_URL } from '@/lib/constants/routes';
import { handleResponse } from '@/shared/api/fetch';

export interface ReviewUpdate {
  rating: number;
  title: string;
  review: string;
}

export async function getReviews(productId: string, signal?: AbortSignal) {
  const response = await fetch(`${RATING_SERVICE_URL}/products/${productId}/reviews`, {
    signal,
  });
  return handleResponse<Review[]>(response);
}

export async function createReview(data: ReviewCreate) {
  const response = await fetch(`${RATING_SERVICE_URL}/products/${data.product_id}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse<Review>(response);
}

export async function updateReview(productId: number, reviewId: number, data: ReviewUpdate) {
  const response = await fetch(`${RATING_SERVICE_URL}/products/${productId}/reviews/${reviewId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse<Review>(response);
}

export async function deleteReview(productId: number, reviewId: number) {
  const response = await fetch(`${RATING_SERVICE_URL}/products/${productId}/reviews/${reviewId}`, {
    method: 'DELETE',
  });
  return handleResponse<void>(response);
}
