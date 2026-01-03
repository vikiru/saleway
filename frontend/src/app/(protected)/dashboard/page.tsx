import { DashboardStats } from '@/lib/components/dashboard/DashboardStats';
import { RecentOrders } from '@/lib/components/dashboard/RecentOrders';

export default function DashboardPage() {
  const stats = {
    totalOrders: 1234,
    totalSpent: 4567,
  };

  const recentOrders = [
    {
      id: '1',
      number: 'WU88191139',
      date: 'May 3, 2023',
      total: '$230.00',
      status: 'Delivered',
      items: 2,
    },
    {
      id: '2',
      number: 'WU88191140',
      date: 'May 5, 2023',
      total: '$150.00',
      status: 'Shipped',
      items: 1,
    },
    {
      id: '3',
      number: 'WU88191141',
      date: 'May 6, 2023',
      total: '$49.00',
      status: 'Processing',
      items: 1,
    },
    {
      id: '4',
      number: 'WU88191142',
      date: 'May 8, 2023',
      total: '$320.00',
      status: 'Delivered',
      items: 3,
    },
    {
      id: '5',
      number: 'WU88191142',
      date: 'May 8, 2023',
      total: '$320.00',
      status: 'Delivered',
      items: 3,
    },
  ];

  return (
    <div className="flex-1 space-y-6 p-8 pt-6 bg-gray-50/50 min-h-screen">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      <div className="space-y-6">
        <DashboardStats totalOrders={stats.totalOrders} totalSpent={stats.totalSpent} />

        <div className="grid gap-6 md:grid-cols-1">
          <RecentOrders orders={recentOrders} />
        </div>
      </div>
    </div>
  );
}
