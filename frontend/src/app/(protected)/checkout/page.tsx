import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/server/auth';
import { SIGNIN_ROUTE } from '@/lib/constants/routes';
import { getProduct } from '@/lib/api/product';
import { CheckoutClient } from '@/app/(protected)/checkout/CheckoutClient';

export default async function CheckoutPage() {
  const userId = await getCurrentUser();
  if (!userId) {
    redirect(SIGNIN_ROUTE);
  }

  return <CheckoutPageWrapper userId={userId} />;
}

async function CheckoutPageWrapper({ userId }: { userId: string }) {
  return <CheckoutClient userId={userId} initialCartItems={[]} />;
}
