'use client';

import { DollarSign, Package, ShoppingCart, TrendingUp } from 'lucide-react';
import { useDashboardStats } from '@/features/order/hooks/useDashboardStats';
import { StatsCard } from '@/features/user/components/StatsCard';

type DashboardStatsProps = {
  userId: string;
};

export function DashboardStats({ userId }: DashboardStatsProps) {
  const { stats, isLoading, error } = useDashboardStats(userId);

  if (isLoading || error || !stats) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard icon={Package} title="Total Orders" value="-" />
        <StatsCard icon={DollarSign} title="Total Spent" value="-" />
        <StatsCard icon={TrendingUp} title="Avg. Order Value" value="-" />
        <StatsCard icon={ShoppingCart} title="Pending Orders" value="-" />
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard icon={Package} title="Total Orders" value={stats.totalOrders} />
      <StatsCard icon={DollarSign} title="Total Spent" value={`$${stats.totalSpent.toLocaleString()}`} />
      <StatsCard icon={TrendingUp} title="Avg. Order Value" value={`$${stats.avgOrderValue.toFixed(2)}`} />
      <StatsCard icon={ShoppingCart} title="Pending Orders" value={stats.pendingOrders} />
    </div>
  );
}
