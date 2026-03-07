'use client';

import { OnboardingForm } from '@/features/user/components/OnboardingForm';

export function OnboardingPage() {
  return (
    <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center pt-8">
          <h1 className="text-3xl font-bold">Welcome!</h1>
          <p className="text-muted-foreground mt-2">Let's get your profile set up</p>
        </div>
        <OnboardingForm />
      </div>
    </div>
  );
}
