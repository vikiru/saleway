import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/server/auth';
import { SIGNIN_ROUTE } from '@/lib/constants/routes';
import { CheckoutSuccessClient } from '@/app/(protected)/checkout/success/CheckoutSuccessClient';

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const userId = await getCurrentUser();
  if (!userId) {
    redirect(SIGNIN_ROUTE);
  }

  const { session_id } = await searchParams;

  if (!session_id) {
    redirect(SIGNIN_ROUTE);
  }

  return <CheckoutSuccessClient userId={userId} sessionId={session_id} />;
}
