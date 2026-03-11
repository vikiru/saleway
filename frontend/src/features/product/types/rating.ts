import type { Review } from '@/features/product/types/product';
import type { ServiceResponse } from '@/shared/api/types';

export type ReviewsResponse = ServiceResponse<Review[]>;
export type AverageRatingResponse = ServiceResponse<{
  average: number;
  count: number;
}>;
