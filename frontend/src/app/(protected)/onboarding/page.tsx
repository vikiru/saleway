import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/server/auth';
import { SIGNIN_ROUTE, DASHBOARD_ROUTE } from '@/lib/constants/routes';

export default async function OnboardingPage() {
  const userId = await getCurrentUser();
  if (!userId) {
    redirect(SIGNIN_ROUTE);
  }

  // If onboarding is finished, we could redirect to dashboard, but keeping it simple for now.
  // redirect(DASHBOARD_ROUTE);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Onboarding</h1>
      <p className="mt-4">Welcome, {userId}. Let's get you started.</p>
    </div>
  );
}
