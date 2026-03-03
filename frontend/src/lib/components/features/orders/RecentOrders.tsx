'use client';

import { ArrowRight, Package } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useOrders } from '@/lib/queries/order';
import type { OrderStatus } from '@/lib/types/order';

type RecentOrdersProps = {
  userId: string;
};

export function RecentOrders({ userId }: RecentOrdersProps) {
  const { data: response, isLoading, error } = useOrders(userId);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Loading orders...</p>
        </CardContent>
      </Card>
    );
  }

  if (error || !response?.success || !response.data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Unable to load recent orders.</p>
        </CardContent>
      </Card>
    );
  }

  const orders = response.data.slice(0, 5);

  if (orders.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No orders yet.</p>
        </CardContent>
      </Card>
    );
  }

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
                  <p className="text-sm font-medium leading-none">Order #{order.id}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(order.purchaseDate).toLocaleDateString()} · {order.items.length}{' '}
                    {order.items.length === 1 ? 'item' : 'items'}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                <div className="font-medium">${order.totalPrice.toLocaleString()}</div>
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

function getStatusColor(status: OrderStatus) {
  switch (status) {
    case 'delivered':
      return 'bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-300';
    case 'completed':
      return 'bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-300';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
    case 'cancelled':
      return 'bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-300';
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300';
  }
}
