import z from 'zod';
import '../../../envConfig.ts';
import { validateData } from '../lib/utils/validateData';

const envSchema = z.object({
  NODE_ENV: z
    .union([z.literal('development'), z.literal('production')])
    .optional()
    .default('development'),
  STRIPE_PUBLISHABLE_KEY: z.string(),
});

const env = validateData(process.env, envSchema);

if (!env.success) {
  console.error('Invalid environment variables', env.error);
  throw new Error('Invalid environment variables');
}

export const validatedEnv = env.data;

export const stripePublishableKey = validatedEnv.STRIPE_PUBLISHABLE_KEY;
export const nodeEnv = validatedEnv.NODE_ENV;
