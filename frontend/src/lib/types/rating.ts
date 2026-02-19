export interface UserReview {
  id: number;
  userId: string;
  productId: number;
  title: string;
  author: string;
  review: string;
  rating: number;
  dateReviewed: string;
  datePurchased: string;
}

export interface UserReviewCreate {
  userId: string;
  productId: number;
  title: string;
  author: string;
  review: string;
  rating: number;
  datePurchased: string;
}

export interface UserReviewUpdate {
  title?: string;
  author?: string;
  review?: string;
  rating?: number;
}

export interface ReviewResponse {
  success: boolean;
  data?: UserReview;
  error?: string;
}

export interface ReviewsResponse {
  success: boolean;
  data?: UserReview[];
  error?: string;
}

export interface ProductReviewsResponse {
  success: boolean;
  data?: {
    reviews: UserReview[];
    averageRating: number;
    totalReviews: number;
  };
  error?: string;
}

export interface UserReviewsResponse {
  success: boolean;
  data?: {
    reviews: UserReview[];
    totalReviews: number;
  };
  error?: string;
}
