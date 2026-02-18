import { RATING_SERVICE_URL } from '@/lib/routes';
import type {
  ProductReviewsResponse,
  ReviewResponse,
  UserReviewCreate,
  UserReviewsResponse,
  UserReviewUpdate,
} from '@/lib/types/rating';
import { handleResponse } from './fetch';

export async function fetchProductRatings(productId: number, signal?: AbortSignal): Promise<ProductReviewsResponse> {
  const response = await fetch(`${RATING_SERVICE_URL}/reviews/product/${productId}`, { signal });
  return handleResponse(response);
}

export async function fetchUserRatings(userId: number, signal?: AbortSignal): Promise<UserReviewsResponse> {
  const response = await fetch(`${RATING_SERVICE_URL}/reviews/user/${userId}`, { signal });
  return handleResponse(response);
}

export async function createRating(review: UserReviewCreate): Promise<ReviewResponse> {
  const response = await fetch(`${RATING_SERVICE_URL}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review),
  });
  return handleResponse(response);
}

export async function updateRating(reviewId: number, review: UserReviewUpdate): Promise<ReviewResponse> {
  const response = await fetch(`${RATING_SERVICE_URL}/reviews/${reviewId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review),
  });
  return handleResponse(response);
}

export async function deleteRating(reviewId: number): Promise<ReviewResponse> {
  const response = await fetch(`${RATING_SERVICE_URL}/reviews/${reviewId}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
}
