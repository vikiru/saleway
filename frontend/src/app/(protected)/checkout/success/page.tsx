import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/features/user/actions/auth';
import { CART_ROUTE, SIGNIN_ROUTE } from '@/lib/constants/routes';
import { CheckoutSuccess } from '@/pages/checkout/CheckoutSuccess';

export default async function Page({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const userId = await getCurrentUser();
  if (!userId) {
    redirect(SIGNIN_ROUTE);
  }

  const { session_id } = await searchParams;

  if (!session_id) {
    redirect(CART_ROUTE);
  }

  return <CheckoutSuccess sessionId={session_id} userId={userId} />;
}
