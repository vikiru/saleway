import { redirect } from 'next/navigation';

import { verifyCheckoutSession } from '@/features/checkout/actions/checkout';
import { getCurrentUser } from '@/features/user/actions/auth';
import { CART_ROUTE, SIGNIN_ROUTE } from '@/shared/config/routes';
import { CheckoutSuccess } from '@/views/checkout/CheckoutSuccess';

export default async function Page({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const userId = await getCurrentUser();
  if (!userId) {
    redirect(SIGNIN_ROUTE);
  }

  const { session_id } = await searchParams;

  if (!session_id) {
    redirect(CART_ROUTE);
  }

  const result = await verifyCheckoutSession(session_id);

  return <CheckoutSuccess result={result} sessionId={session_id} />;
}
