import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/features/user/actions/auth';
import { SIGNIN_ROUTE } from '@/shared/config/routes';
import { OrderDetailsPage } from '@/views/order-details/OrderDetailsPage';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const userId = await getCurrentUser();
  if (!userId) {
    redirect(SIGNIN_ROUTE);
  }

  const resolvedParams = await params;

  return <OrderDetailsPage id={resolvedParams.id} />;
}
