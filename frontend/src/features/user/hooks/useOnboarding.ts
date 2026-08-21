'use client';

import type { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import type { EcommerceUserCreate } from '@/entities/user/types/user';

import { onboardingSchema } from '@/entities/user/schemas/onboarding';
import { createUser } from '@/features/user/actions/user';
import { DASHBOARD_ROUTE, ONBOARDING_ROUTE } from '@/shared/config/routes';

export function useOnboarding() {
  const router = useRouter();

  useEffect(() => {
    if (window.location.search) {
      router.replace(ONBOARDING_ROUTE);
    }
  }, [router]);

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
    router.push(DASHBOARD_ROUTE);
  };

  return { form, onSubmit };
}
