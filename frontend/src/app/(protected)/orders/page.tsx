import { requireUser } from '@/features/user/actions/auth';
import { OrdersPage } from '@/pages/orders/OrdersPage';

export default async function Page() {
  const userId = await requireUser();
  return <OrdersPage userId={userId} />;
}
