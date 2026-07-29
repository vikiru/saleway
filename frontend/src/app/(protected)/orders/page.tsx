import { requireUser } from '@/features/user/actions/auth';
import { OrdersPage } from '@/views/orders/OrdersPage';

export default async function Page() {
  const userId = await requireUser();
  return <OrdersPage userId={userId} />;
}
