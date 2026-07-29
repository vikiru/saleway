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
import { requireUser } from '@/features/user/actions/auth';

export async function getReviewsAction(productId: string): Promise<ReviewsResponse> {
  try {
    const result = await getProductReviewsApi(productId);
    return { success: true, message: 'Reviews fetched successfully', data: result?.reviews || [] };
  } catch (error: unknown) {
    console.error('[getReviewsAction]', error);
    return { success: false, error: 'Failed to fetch reviews. Please try again.' };
  }
}

export async function createReviewAction(data: ReviewCreate): Promise<ReviewResponse> {
  try {
    const result = await createReviewApi(data);
    return { success: true, message: 'Review created successfully', data: result };
  } catch (error: unknown) {
    console.error('[createReviewAction]', error);
    return { success: false, error: 'Failed to submit review. Please try again.' };
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
    console.error('[updateReviewAction]', error);
    return { success: false, error: 'Failed to update review. Please try again.' };
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
    console.error('[deleteReviewAction]', error);
    return { success: false, error: 'Failed to delete review. Please try again.' };
  }
}

export async function getProductReviewsAction(productId: string | number): Promise<ProductReviewsResponse['data']> {
  return getProductReviewsApi(productId);
}

export async function getUserReviewsAction(): Promise<UserReviewsResponse['data']> {
  const userId = await requireUser();
  return getUserReviewsApi(userId);
}

export async function getProductAverageRatingAction(productId: string | number): Promise<{ average_rating: number }> {
  return getProductAverageRatingApi(productId);
}
