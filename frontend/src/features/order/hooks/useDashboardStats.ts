import { useOrders } from '@/features/order/queries/order';
import { calculateDashboardStats } from '../utils/stats';

export function useDashboardStats(userId: string) {
  const { data: orders, isLoading, error } = useOrders(userId);

  const stats = orders ? calculateDashboardStats(orders) : null;

  return {
    stats,
    isLoading,
    error,
  };
}
