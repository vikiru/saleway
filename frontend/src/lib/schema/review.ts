import { z } from 'zod';

export const reviewSchema = z.object({
  rating: z.number().min(1, 'Please select a rating').max(5),
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  review: z.string().min(5, 'Review must be at least 5 characters').max(1000, 'Review is too long'),
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;
