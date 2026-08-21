import { z } from 'zod';

const isServer = typeof window === 'undefined';

const envSchema = z.object({
  NODE_ENV: z
    .union([z.literal('development'), z.literal('production')])
    .optional()
    .default('development'),

  // Server-only variables (optional on client to prevent crashes)
  STRIPE_PUBLISHABLE_KEY: isServer ? z.string() : z.string().optional(),
  CLERK_SECRET_KEY: isServer ? z.string() : z.string().optional(),
  CART_SERVICE_URL: z.string().default('http://localhost:8080/api/v1'),
  ORDER_SERVICE_URL: z.string().default('http://localhost:5000/api/v1'),
  PAYMENT_SERVICE_URL: z.string().default('http://localhost:8081/api/v1'),
  PRODUCT_SERVICE_URL: z.string().default('http://localhost:8000/api/v1'),
  RATING_SERVICE_URL: z.string().default('http://localhost:8001/api/v1'),
  USER_SERVICE_URL: z.string().default('http://localhost:8002/api/v1'),

  // Public variables
  NEXT_PUBLIC_APP_URL: z.string().default('http://localhost:3000'),
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().default('/auth/login'),
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string().default('/auth/signup'),
  NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL: z.string().default('/dashboard'),
  NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL: z.string().default('/onboarding'),
});

const env = envSchema.safeParse(process.env);

const fallbackEnv = {
  CART_SERVICE_URL: process.env.CART_SERVICE_URL || 'http://localhost:8080/api/v1',
  ORDER_SERVICE_URL: process.env.ORDER_SERVICE_URL || 'http://localhost:5000/api/v1',
  PAYMENT_SERVICE_URL: process.env.PAYMENT_SERVICE_URL || 'http://localhost:8081/api/v1',
  PRODUCT_SERVICE_URL: process.env.PRODUCT_SERVICE_URL || 'http://localhost:8000/api/v1',
  RATING_SERVICE_URL: process.env.RATING_SERVICE_URL || 'http://localhost:8001/api/v1',
  USER_SERVICE_URL: process.env.USER_SERVICE_URL || 'http://localhost:8002/api/v1',
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || '/auth/login',
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL || '/auth/signup',
  NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL:
    process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL || '/dashboard',
  NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL:
    process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL || '/onboarding',
  STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY || '',
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY || '',
  NODE_ENV: (process.env.NODE_ENV === 'production' ? 'production' : 'development') as 'development' | 'production',
};

export type EnvConfig = z.infer<typeof envSchema>;
export const validatedEnv: EnvConfig = env.success ? env.data : fallbackEnv;
export const stripePublishableKey = validatedEnv.STRIPE_PUBLISHABLE_KEY;
export const nodeEnv = validatedEnv.NODE_ENV;
