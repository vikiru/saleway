import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/features/user/actions/auth';
import { SIGNIN_ROUTE } from '@/lib/constants/routes';
import { CheckoutSuccessPage } from '@/pages/checkout/ui/CheckoutSuccessPage';

export default async function Page({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const userId = await getCurrentUser();
  if (!userId) {
    redirect(SIGNIN_ROUTE);
  }

  const { session_id } = await searchParams;

  if (!session_id) {
    redirect(SIGNIN_ROUTE);
  }

  return <CheckoutSuccessPage sessionId={session_id} userId={userId} />;
}
