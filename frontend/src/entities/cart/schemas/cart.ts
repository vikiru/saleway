import { z } from 'zod';

export const cartItemCreateInputSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().min(1),
  unitPrice: z.number().min(0).optional(),
});

export const cartItemSchema = z.object({
  cartItemId: z.string().uuid(),
  productId: z.string(),
  cartId: z.string().uuid(),
  quantity: z.number().int().min(1),
  unitPrice: z.number().or(z.string().transform(Number)),
  totalPrice: z.number().or(z.string().transform(Number)),
  product: z.any().optional(),
});

export const cartSchema = z.object({
  cartId: z.string().uuid(),
  userId: z.string(),
  createdAt: z
    .string()
    .datetime()
    .or(z.date().transform((d) => d.toISOString())),
  updatedAt: z
    .string()
    .datetime()
    .or(z.date().transform((d) => d.toISOString())),
  totalPrice: z.number().or(z.string().transform(Number)),
  items: z.array(cartItemSchema).default([]),
});
