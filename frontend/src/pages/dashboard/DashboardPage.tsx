'use client';

import { DashboardStats } from '@/features/order/components/DashboardStats';
import { RecentOrders } from '@/features/order/components/RecentOrders';
import type { Order } from '@/features/order/types/order';
import type { DashboardStatsData } from '@/features/order/utils/stats';

interface DashboardPageProps {
  userId: string;
  initialOrders?: Order[];
  initialStats?: DashboardStatsData;
}

export function DashboardPage({ userId, initialOrders, initialStats }: DashboardPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 pt-12">Dashboard</h1>
      <DashboardStats initialStats={initialStats} userId={userId} />
      <div className="mt-8">
        <RecentOrders initialOrders={initialOrders} userId={userId} />
      </div>
    </div>
  );
}
