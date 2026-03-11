'use client';

import { OnboardingForm } from '@/features/user/components/OnboardingForm';

export function OnboardingPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 lg:p-12">
      <div className="w-full max-w-none lg:max-w-[1400px] mx-auto">
        <div className="w-full lg:w-3/4 xl:w-[75%] mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight">Welcome!</h1>
            <p className="text-muted-foreground mt-3 text-lg">Let's get your profile set up</p>
          </div>
          <OnboardingForm />
        </div>
      </div>
    </div>
  );
}
