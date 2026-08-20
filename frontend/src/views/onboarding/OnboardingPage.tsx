'use client';

import { OnboardingForm } from '@/features/user/components/OnboardingForm';

export function OnboardingPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4 sm:p-6 lg:p-12">
      <div className="mx-auto w-full max-w-none lg:max-w-[1400px]">
        <div className="mx-auto w-full lg:w-3/4 xl:w-[75%]">
          <div className="mb-12 text-center">
            <h1 className="font-bold tracking-tight">Welcome!</h1>
            <p className="mt-3 text-lg text-muted-foreground">Let's get your profile set up</p>
          </div>
          <OnboardingForm />
        </div>
      </div>
    </div>
  );
}
