import { z } from 'zod';

export const orderStatusSchema = z.enum(['pending', 'completed', 'cancelled', 'delivered']);

export const orderItemCreateSchema = z.object({
  product_id: z.number().int(),
  product_name: z.string(),
  product_brand: z.string(),
  product_description: z.string(),
  product_image: z.string(),
  product_unit_price: z.number().or(z.string().transform(Number)),
  product_quantity: z.number().int(),
});

export const orderItemReadSchema = z.object({
  id: z.number().int(),
  product_id: z.number().int(),
  product_name: z.string(),
  product_brand: z.string(),
  product_description: z.string(),
  product_image: z.string(),
  product_unit_price: z.number(),
  product_total_price: z.number(),
  product_quantity: z.number().int(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const orderCreateSchema = z.object({
  user_id: z.string(),
  items: z.array(orderItemCreateSchema),
  purchase_date: z
    .string()
    .datetime()
    .or(z.date().transform((d) => d.toISOString())),
  total_price: z.number().or(z.string().transform(Number)),
  stripe_session_id: z.string().nullable().optional(),
});

export const orderReadSchema = z.object({
  id: z.number().int(),
  user_id: z.string(),
  purchase_date: z.string(),
  expected_delivery_date: z.string(),
  total_price: z.number(),
  status: orderStatusSchema,
  stripe_session_id: z.string().nullable().optional(),
  created_at: z.string(),
  updated_at: z.string(),
  items: z.array(orderItemReadSchema).default([]),
});
