import { ArrowRight, Package } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Order = {
  id: string;
  number: string;
  date: string;
  total: string;
  status: string;
  items: number;
};

type RecentOrdersProps = {
  orders: Order[];
};

export function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Orders</CardTitle>
        <Button asChild className="hidden sm:flex" size="sm" variant="outline">
          <Link href="/orders">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {orders.map((order) => (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4" key={order.id}>
              <div className="flex items-center gap-4">
                <Avatar className="h-9 w-9 hidden sm:flex">
                  <AvatarFallback>
                    <Package className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">Order #{order.number}</p>
                  <p className="text-xs text-muted-foreground">
                    {order.date} · {order.items} {order.items === 1 ? 'item' : 'items'}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                <div className="font-medium">{order.total}</div>
                <Badge className={getStatusColor(order.status)} variant="secondary">
                  {order.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
        <Button asChild className="w-full mt-6 sm:hidden" size="sm" variant="outline">
          <Link href="/orders">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case 'delivered':
      return 'bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-300';
    case 'shipped':
      return 'bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300';
    case 'processing':
      return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300';
  }
}
