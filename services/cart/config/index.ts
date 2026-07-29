import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3000),
  // The @clerk/backend SDK requires the secret key to securely authenticate
  // with Clerk's API and automatically fetch the public JWKS for token verification.
  CLERK_SECRET_KEY: z.string(),
});

export const validatedEnv = envSchema.safeParse(process.env);

if (!validatedEnv.success) {
  console.error(validatedEnv.error);
  process.exit(1);
}

const apiVersionString = 'v1';
const env = validatedEnv.data;

export { apiVersionString, env };
