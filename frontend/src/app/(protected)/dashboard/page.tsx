import { getOrders } from '@/features/order/api/order';
import { calculateDashboardStats } from '@/features/order/utils/stats';
import { requireUser } from '@/features/user/actions/auth';
import { DashboardPage } from '@/views/dashboard/DashboardPage';

export default async function Page() {
  const userId = await requireUser();
  const orders = await getOrders(userId);
  const initialStats = calculateDashboardStats(orders);

  return <DashboardPage initialOrders={orders} initialStats={initialStats} userId={userId} />;
}
