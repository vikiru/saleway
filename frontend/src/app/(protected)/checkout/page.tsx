import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/features/user/actions/auth';
import { SIGNIN_ROUTE } from '@/lib/constants/routes';
import { CheckoutPage } from '@/pages/checkout/ui/CheckoutPage';

export default async function Page() {
  const userId = await getCurrentUser();
  if (!userId) {
    redirect(SIGNIN_ROUTE);
  }

  return <CheckoutPage initialCartItems={[]} userId={userId} />;
}
