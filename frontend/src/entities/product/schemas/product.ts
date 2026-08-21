import { z } from 'zod';

export const productImageSchema = z.object({
  id: z.number().int(),
  product_id: z.number().int(),
  image_url: z.string().url(),
  image_author: z.string(),
  alt_text: z.string(),
  attribution: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const productSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  brand: z.string(),
  category: z.string(),
  summary: z.string(),
  description: z.string(),
  price: z.number().or(z.string().transform(Number)),
  created_at: z.string(),
  updated_at: z.string(),
  image: productImageSchema,
});

export const productWithRatingSchema = productSchema.extend({
  rating: z.number().optional(),
  review_count: z.number().int().optional(),
});

export const productCreateSchema = z.object({
  name: z.string(),
  brand: z.string(),
  category: z.string(),
  summary: z.string(),
  description: z.string(),
  price: z.number(),
});

export const productUpdateSchema = productCreateSchema.partial();

export const productImageCreateSchema = z.object({
  product_id: z.number().int(),
  image_url: z.string().url(),
  image_author: z.string(),
  alt_text: z.string(),
  attribution: z.string(),
});

export const productSearchResponseSchema = z.object({
  products: z.array(productSchema),
  total: z.number().int(),
  page: z.number().int(),
  page_size: z.number().int(),
});
