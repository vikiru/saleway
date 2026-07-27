'use server';

import {
  createReview as createReviewApi,
  deleteReview as deleteReviewApi,
  getProductAverageRating as getProductAverageRatingApi,
  getProductReviews as getProductReviewsApi,
  getUserReviews as getUserReviewsApi,
  updateReview as updateReviewApi,
} from '@/features/rating/api/rating';
import type {
  ProductReviewsResponse,
  ReviewCreate,
  ReviewResponse,
  ReviewsResponse,
  ReviewUpdate,
  UserReviewsResponse,
} from '@/features/rating/types/rating';

export async function getReviewsAction(productId: string): Promise<ReviewsResponse> {
  try {
    const result = await getProductReviewsApi(productId);
    return { success: true, message: 'Reviews fetched successfully', data: result?.reviews || [] };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch reviews';
    return { success: false, error: message };
  }
}

export async function createReviewAction(data: ReviewCreate): Promise<ReviewResponse> {
  try {
    const result = await createReviewApi(data);
    return { success: true, message: 'Review created successfully', data: result };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to create review';
    return { success: false, error: message };
  }
}

export async function updateReviewAction(
  productId: number,
  reviewId: number,
  data: ReviewUpdate,
): Promise<ReviewResponse> {
  try {
    const result = await updateReviewApi(productId, reviewId, data);
    return { success: true, message: 'Review updated successfully', data: result };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to update review';
    return { success: false, error: message };
  }
}

export async function deleteReviewAction(
  productId: number,
  reviewId: number,
): Promise<{ success: boolean; error?: string }> {
  try {
    await deleteReviewApi(productId, reviewId);
    return { success: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to delete review';
    return { success: false, error: message };
  }
}

export async function getProductReviewsAction(productId: string | number): Promise<ProductReviewsResponse['data']> {
  return getProductReviewsApi(productId);
}

export async function getUserReviewsAction(userId: string): Promise<UserReviewsResponse['data']> {
  return getUserReviewsApi(userId);
}

export async function getProductAverageRatingAction(productId: string | number): Promise<{ average_rating: number }> {
  return getProductAverageRatingApi(productId);
}
