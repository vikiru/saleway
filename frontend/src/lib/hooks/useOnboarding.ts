'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';
import type { EcommerceUserCreate } from '@/features/user/types/user';
import { onboardingSchema } from '@/lib/schema/onboarding';
import { createUser } from '@/lib/server/actions/users';

export function useOnboarding() {
  const router = useRouter();

  const form = useForm<z.infer<typeof onboardingSchema>>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof onboardingSchema>) => {
    const result = await createUser(values as EcommerceUserCreate);

    if (!result.success) {
      toast.error(result.error || 'Failed to create profile');
      return;
    }

    toast.success('Profile created successfully!');
    router.push('/dashboard');
  };

  return { form, onSubmit };
}
