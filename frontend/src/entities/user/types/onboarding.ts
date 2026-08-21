import { z } from 'zod';

export const onboardingSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
});

export type OnboardingFormData = z.infer<typeof onboardingSchema>;
