import { DollarSign, ShoppingBag } from 'lucide-react';
import { StatsCard } from './StatsCard';

type DashboardStatsProps = {
  totalOrders: number;
  totalSpent: number;
};

export function DashboardStats({ totalOrders, totalSpent }: DashboardStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard icon={ShoppingBag} title="Total Orders" value={totalOrders.toLocaleString()} />
      <StatsCard icon={DollarSign} title="Total Spent" value={`$${totalSpent.toLocaleString()}`} />
    </div>
  );
}
