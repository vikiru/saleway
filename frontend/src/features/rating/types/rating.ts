import type { ServiceResponse } from '@/shared/api/types';

export interface Review {
  id: number;
  user_id: string;
  author: string;
  rating: number;
  title: string;
  review: string;
  date_reviewed: string;
  date_purchased: string;
}

export interface ReviewCreate {
  user_id?: string;
  product_id: number;
  title: string;
  author: string;
  review: string;
  rating: number;
  date_reviewed?: string;
  date_purchased: string;
}

export interface ReviewUpdate {
  title?: string;
  author?: string;
  review?: string;
  rating?: number;
}

export type ReviewResponse = ServiceResponse<Review>;
export type ReviewsResponse = ServiceResponse<Review[]>;

export interface ProductReviewsResponse {
  success: boolean;
  data?: {
    reviews: Review[];
    average_rating: number;
    total_reviews: number;
  };
  error?: string;
}

export interface UserReviewsResponse {
  success: boolean;
  data?: {
    reviews: Review[];
    total_reviews: number;
  };
  error?: string;
}
