import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  onboarding_status: z.string(),
  onboarding_step: z.string(),
  onboarding_data: z.record(z.string(), z.any()).nullable(),
  created_at: z
    .string()
    .datetime()
    .or(z.date().transform((d) => d.toISOString())),
  updated_at: z
    .string()
    .datetime()
    .or(z.date().transform((d) => d.toISOString())),
});

export const userCreateSchema = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
});

export const userUpdateSchema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  onboarding_status: z.string().optional(),
  onboarding_step: z.string().optional(),
  onboarding_data: z.record(z.string(), z.any()).nullable().optional(),
});
