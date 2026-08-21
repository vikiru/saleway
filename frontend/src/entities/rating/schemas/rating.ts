import { z } from 'zod';

export const reviewFormSchema = z.object({
  rating: z.number().min(1, 'Please select a rating').max(5),
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  review: z.string().min(5, 'Review must be at least 5 characters').max(1000, 'Review is too long'),
});

export type ReviewFormValues = z.infer<typeof reviewFormSchema>;

export const reviewSchema = z.object({
  id: z.number().int(),
  user_id: z.string(),
  product_id: z.number().int(),
  title: z.string(),
  author: z.string(),
  review: z.string(),
  rating: z.number().min(0).max(5).step(0.5),
  date_reviewed: z.string(),
  date_purchased: z.string(),
});

export const reviewCreateSchema = z.object({
  user_id: z.string(),
  product_id: z.number().int(),
  review: z.string(),
  rating: z.number().min(0).max(5).step(0.5),
  title: z.string(),
  author: z.string(),
  date_reviewed: z
    .string()
    .datetime()
    .or(z.date().transform((d) => d.toISOString())),
  date_purchased: z
    .string()
    .datetime()
    .or(z.date().transform((d) => d.toISOString())),
});

export const reviewUpdateSchema = reviewCreateSchema.partial();

export const productReviewsDataSchema = z.object({
  reviews: z.array(reviewSchema),
  average_rating: z.number(),
  total_reviews: z.number(),
});

export const userReviewsDataSchema = z.object({
  reviews: z.array(reviewSchema),
  total_reviews: z.number(),
});
