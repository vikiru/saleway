import { useOrders } from '@/features/order/queries/order';
import type { Order } from '@/features/order/types/order';

export function useDashboardStats(userId: string) {
  const { data: orders, isLoading, error } = useOrders(userId);

  const stats = orders ? calculateStats(orders) : null;

  return {
    stats,
    isLoading,
    error,
  };
}

function calculateStats(orders: Order[]) {
  const totalOrders = orders.length;
  const totalSpent = orders.reduce((sum, order) => sum + order.total_price, 0);
  const avgOrderValue = totalOrders > 0 ? totalSpent / totalOrders : 0;
  const pendingOrders = orders.filter((order) => order.status === 'pending').length;

  return {
    totalOrders,
    totalSpent,
    avgOrderValue,
    pendingOrders,
  };
}
