'use server';

import type { ReviewResponse, UserReviewCreate, UserReviewUpdate } from '@/features/rating/types/rating';
import { handleResponse } from '@/lib/api/fetch';
import { RATING_SERVICE_URL } from '@/lib/routes';

export async function createReview(review: UserReviewCreate): Promise<ReviewResponse> {
  const response = await fetch(`${RATING_SERVICE_URL}/products/${review.productId}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review),
  });
  return handleResponse(response);
}

export async function updateReview(reviewId: number, review: UserReviewUpdate): Promise<ReviewResponse> {
  const response = await fetch(`${RATING_SERVICE_URL}/reviews/${reviewId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review),
  });
  return handleResponse(response);
}

export async function deleteReview(reviewId: number): Promise<ReviewResponse> {
  const response = await fetch(`${RATING_SERVICE_URL}/reviews/${reviewId}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
}
