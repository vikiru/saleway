import type {
  ProductReviewsResponse,
  Review,
  ReviewCreate,
  ReviewUpdate,
  UserReviewsResponse,
} from '@/features/rating/types/rating';

import {
  productReviewsDataSchema,
  reviewCreateSchema,
  reviewSchema,
  reviewUpdateSchema,
  userReviewsDataSchema,
} from '@/features/rating/schemas/rating';
import { RATING_SERVICE_URL } from '@/lib/constants/routes';
import { handleResponse } from '@/shared/api/fetch';

export async function getProductAverageRating(
  productId: number | string,
  signal?: AbortSignal,
): Promise<{ average_rating: number }> {
  const response = await fetch(`${RATING_SERVICE_URL}/products/${productId}/rating`, { signal });
  const result = await handleResponse<{ average_rating: number }>(response);
  return result;
}

export async function getProductReviews(
  productId: number | string,
  signal?: AbortSignal,
): Promise<ProductReviewsResponse['data']> {
  const response = await fetch(`${RATING_SERVICE_URL}/products/${productId}/reviews`, { signal });
  const data = await handleResponse<ProductReviewsResponse['data']>(response);
  const parsed = productReviewsDataSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error('Invalid product reviews response format');
  }
  return parsed.data;
}

export async function getUserReviews(userId: string, signal?: AbortSignal): Promise<UserReviewsResponse['data']> {
  const response = await fetch(`${RATING_SERVICE_URL}/reviews/user/${userId}`, { signal });
  const data = await handleResponse<UserReviewsResponse['data']>(response);
  const parsed = userReviewsDataSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error('Invalid user reviews response format');
  }
  return parsed.data;
}

export async function createReview(data: ReviewCreate): Promise<Review> {
  const inputParsed = reviewCreateSchema.safeParse(data);
  if (!inputParsed.success) {
    throw new Error('Invalid review creation payload');
  }
  const response = await fetch(`${RATING_SERVICE_URL}/products/${data.product_id}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inputParsed.data),
  });
  const responseData = await handleResponse<Review>(response);
  const parsed = reviewSchema.safeParse(responseData);
  if (!parsed.success) {
    throw new Error('Invalid review response format');
  }
  return parsed.data as unknown as Review;
}

export async function updateReview(productId: number, reviewId: number, data: ReviewUpdate): Promise<Review> {
  const inputParsed = reviewUpdateSchema.safeParse(data);
  if (!inputParsed.success) {
    throw new Error('Invalid review update payload');
  }
  const response = await fetch(`${RATING_SERVICE_URL}/products/${productId}/reviews/${reviewId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inputParsed.data),
  });
  const responseData = await handleResponse<Review>(response);
  const parsed = reviewSchema.safeParse(responseData);
  if (!parsed.success) {
    throw new Error('Invalid review response format');
  }
  return parsed.data as unknown as Review;
}

export async function deleteReview(productId: number, reviewId: number): Promise<void> {
  const response = await fetch(`${RATING_SERVICE_URL}/products/${productId}/reviews/${reviewId}`, {
    method: 'DELETE',
  });
  await handleResponse<void>(response);
}
