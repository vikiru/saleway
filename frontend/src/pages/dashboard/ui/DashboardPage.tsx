'use client';

import { DashboardStats } from '@/features/order/components/DashboardStats';
import { RecentOrders } from '@/features/order/components/RecentOrders';

interface DashboardPageProps {
  userId: string;
}

export function DashboardPage({ userId }: DashboardPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 pt-12">Dashboard</h1>
      <DashboardStats userId={userId} />
      <div className="mt-8">
        <RecentOrders userId={userId} />
      </div>
    </div>
  );
}
