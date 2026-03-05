import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/server/auth';
import { SIGNIN_ROUTE } from '@/lib/constants/routes';
import { CartPageClient } from '@/app/(protected)/cart/CartPageClient';

export default async function CartPage() {
  const userId = await getCurrentUser();
  if (!userId) {
    redirect(SIGNIN_ROUTE);
  }

  return <CartPageClient userId={userId} />;
}
