import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/server/auth';
import { SIGNIN_ROUTE } from '@/lib/constants/routes';
import { OrdersClient } from '@/app/(protected)/orders/OrdersClient';

export default async function OrdersPage() {
  const userId = await getCurrentUser();
  if (!userId) {
    redirect(SIGNIN_ROUTE);
  }

  return <OrdersClient userId={userId} />;
}
