'use client';

import { DollarSign, Package, ShoppingCart, TrendingUp } from 'lucide-react';
import { useOrders } from '@/features/order/queries/order';
import type { Order } from '@/features/order/types/order';
import { StatsCard } from '@/lib/components/primitives/StatsCard';

type DashboardStatsProps = {
  userId: string;
};

export function DashboardStats({ userId }: DashboardStatsProps) {
  const { data: response, isLoading, error } = useOrders(userId);

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard icon={Package} title="Total Orders" value="-" />
        <StatsCard icon={DollarSign} title="Total Spent" value="-" />
        <StatsCard icon={TrendingUp} title="Avg. Order Value" value="-" />
        <StatsCard icon={ShoppingCart} title="Pending Orders" value="-" />
      </div>
    );
  }

  if (error || !response?.success || !response.data) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard icon={Package} title="Total Orders" value="-" />
        <StatsCard icon={DollarSign} title="Total Spent" value="-" />
        <StatsCard icon={TrendingUp} title="Avg. Order Value" value="-" />
        <StatsCard icon={ShoppingCart} title="Pending Orders" value="-" />
      </div>
    );
  }

  const orders = response.data;
  const stats = calculateStats(orders);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard icon={Package} title="Total Orders" value={stats.totalOrders} />
      <StatsCard icon={DollarSign} title="Total Spent" value={`$${stats.totalSpent.toLocaleString()}`} />
      <StatsCard icon={TrendingUp} title="Avg. Order Value" value={`$${stats.avgOrderValue.toFixed(2)}`} />
      <StatsCard icon={ShoppingCart} title="Pending Orders" value={stats.pendingOrders} />
    </div>
  );
}

function calculateStats(orders: Order[]) {
  const totalOrders = orders.length;
  const totalSpent = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  const avgOrderValue = totalOrders > 0 ? totalSpent / totalOrders : 0;
  const pendingOrders = orders.filter((order) => order.status === 'pending').length;

  return {
    totalOrders,
    totalSpent,
    avgOrderValue,
    pendingOrders,
  };
}
