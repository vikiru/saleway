'use client';

import { DollarSign, Package, ShoppingCart, TrendingUp } from 'lucide-react';

import type { DashboardStatsData } from '@/entities/order/utils/stats';

import { StatsCard } from '@/entities/user/components/StatsCard';
import { useDashboardStats } from '@/features/order/hooks/useDashboardStats';

type DashboardStatsProps = {
  userId: string;
  initialStats?: DashboardStatsData;
};

export function DashboardStats({ userId, initialStats }: DashboardStatsProps) {
  const { stats: fetchedStats, isLoading, error } = useDashboardStats(userId);

  const stats = initialStats || fetchedStats;

  if (!stats && (isLoading || error)) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard icon={Package} title="Total Orders" value="-" />
        <StatsCard icon={DollarSign} title="Total Spent" value="-" />
        <StatsCard icon={TrendingUp} title="Avg. Order Value" value="-" />
        <StatsCard icon={ShoppingCart} title="Pending Orders" value="-" />
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard icon={Package} title="Total Orders" value={stats.totalOrders} />
      <StatsCard icon={DollarSign} title="Total Spent" value={`$${stats.totalSpent.toLocaleString()}`} />
      <StatsCard icon={TrendingUp} title="Avg. Order Value" value={`$${stats.avgOrderValue.toFixed(2)}`} />
      <StatsCard icon={ShoppingCart} title="Pending Orders" value={stats.pendingOrders} />
    </div>
  );
}
