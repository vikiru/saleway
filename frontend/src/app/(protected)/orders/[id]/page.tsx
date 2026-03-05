import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/server/auth';
import { SIGNIN_ROUTE } from '@/lib/constants/routes';
import { OrderDetailsClient } from '@/app/(protected)/orders/[id]/OrderDetailsClient';

export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const userId = await getCurrentUser();
  if (!userId) {
    redirect(SIGNIN_ROUTE);
  }

  const resolvedParams = await params;

  return <OrderDetailsClient id={resolvedParams.id} userId={userId} />;
}
