import { z } from 'zod';

export const checkoutCartItemSchema = z.object({
  productId: z.string(),
  name: z.string(),
  description: z.string(),
  unitAmount: z.number().or(z.string().transform(Number)),
  currency: z.string(),
  quantity: z.number().int(),
  image: z.string(),
});

export const checkoutSessionRequestSchema = z.object({
  lineItems: z.array(checkoutCartItemSchema),
  successUrl: z.string().url(),
  cancelUrl: z.string().url(),
  customerEmail: z.string().email(),
  metadata: z.record(z.string(), z.string()).optional(),
});

export const checkoutSessionResponseSchema = z.object({
  sessionId: z.string(),
  url: z.string().url(),
});

export const verifySessionRequestSchema = z.object({
  sessionId: z.string(),
});

export const verifySessionResponseSchema = z.object({
  sessionId: z.string(),
  paymentIntentId: z.string(),
  amount: z.number(),
  currency: z.string(),
  status: z.string(),
  metadata: z.record(z.string(), z.string()).optional(),
});

export const refundRequestSchema = z.object({
  paymentIntentId: z.string(),
  amount: z.number(),
  reason: z.string(),
});

export const refundResponseSchema = z.object({
  refundId: z.string(),
  paymentIntentId: z.string(),
  amount: z.number(),
  status: z.string(),
  reason: z.string(),
});
