import { toNum } from '@/shared/lib/numbers';

import type { Order } from '../types/order';

export interface DashboardStatsData {
  totalOrders: number;
  totalSpent: number;
  avgOrderValue: number;
  pendingOrders: number;
}

export function calculateDashboardStats(orders: Order[]): DashboardStatsData {
  const totalOrders = orders.length;
  const totalSpent = orders.reduce((sum, order) => sum + toNum(order.total_price), 0);
  const avgOrderValue = totalOrders > 0 ? totalSpent / totalOrders : 0;
  const pendingOrders = orders.filter((order) => order.status === 'pending').length;

  return {
    totalOrders,
    totalSpent,
    avgOrderValue,
    pendingOrders,
  };
}
