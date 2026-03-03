'use client';

import { useAuth } from '@clerk/nextjs';
import { DashboardStats } from '@/lib/components/features/orders/DashboardStats';
import { RecentOrders } from '@/lib/components/features/orders/RecentOrders';

export default function DashboardPage() {
  const { userId } = useAuth();

  if (!userId) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="space-y-8">
        <DashboardStats userId={userId} />
        <RecentOrders userId={userId} />
      </div>
    </div>
  );
}
