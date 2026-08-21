import type { Order } from '@/entities/order/types/order';
import type { DashboardStatsData } from '@/entities/order/utils/stats';

import { DashboardStats } from '@/entities/order/components/DashboardStats';
import { RecentOrders } from '@/entities/order/components/RecentOrders';

interface DashboardPageProps {
  userId: string;
  initialOrders?: Order[];
  initialStats?: DashboardStatsData;
}

export function DashboardPage({ userId, initialOrders, initialStats }: DashboardPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 pt-12 font-bold tracking-tight">Dashboard</h1>
      <DashboardStats initialStats={initialStats} userId={userId} />
      <div className="mt-8">
        <RecentOrders initialOrders={initialOrders} userId={userId} />
      </div>
    </div>
  );
}
