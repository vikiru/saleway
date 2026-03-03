import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/server/auth';
import { findUserById } from '@/lib/server/user';
import { OnboardingForm } from '../OnboardingForm';

export default async function OnboardingPage() {
  const userId = await getCurrentUser();
  const databaseUser = await findUserById(userId);

  if (databaseUser) {
    redirect('/dashboard');
  }

  return <OnboardingForm />;
}
