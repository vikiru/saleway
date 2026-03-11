'use server';

import type { ReviewUpdate } from '@/features/product/api/rating';
import {
  createReview as createReviewApi,
  deleteReview as deleteReviewApi,
  getReviews as getReviewsApi,
  updateReview as updateReviewApi,
} from '@/features/product/api/rating';
import type { Review, ReviewCreate, ReviewResponse } from '@/features/product/types/product';
import type { ProductReviewsData, UserReviewsData } from '@/features/rating/api/rating';
import {
  getProductReviews as getProductReviewsApi,
  getUserReviews as getUserReviewsApi,
} from '@/features/rating/api/rating';

export async function getReviewsAction(productId: string): Promise<Review[]> {
  return getReviewsApi(productId);
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

export async function getProductReviewsAction(productId: string | number): Promise<ProductReviewsData> {
  return getProductReviewsApi(productId);
}

export async function getUserReviewsAction(userId: string): Promise<UserReviewsData> {
  return getUserReviewsApi(userId);
}
