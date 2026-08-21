'use client';

import { useOrders } from '@/entities/order/queries/order';
import { calculateDashboardStats } from '@/entities/order/utils/stats';

export function useDashboardStats(userId: string) {
  const { data: orders, isLoading, error } = useOrders(userId);

  const stats = orders ? calculateDashboardStats(orders) : null;

  return {
    stats,
    isLoading,
    error,
  };
}
