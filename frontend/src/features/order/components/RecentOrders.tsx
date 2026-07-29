'use client';

import { ArrowRight, Package } from 'lucide-react';
import Link from 'next/link';
import { useOrders } from '@/features/order/queries/order';
import type { Order } from '@/features/order/types/order';
import { Avatar, AvatarFallback } from '@/lib/components/ui/avatar';
import { Badge } from '@/lib/components/ui/badge';
import { Button } from '@/lib/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/lib/components/ui/card';
import { getOrderRoute, ORDERS_ROUTE } from '@/lib/constants/routes';
import { toNum } from '@/shared/utils/numbers';

type RecentOrdersProps = {
  userId: string;
  initialOrders?: Order[];
};

export function RecentOrders({ userId, initialOrders }: RecentOrdersProps) {
  const { data: fetchedOrders, isLoading, error } = useOrders(userId);

  const allOrders = initialOrders || fetchedOrders;

  if (!allOrders && isLoading) {
    return (
      <Card className="border border-border/60 shadow-sm transition-all hover:shadow-md">
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Loading orders...</p>
        </CardContent>
      </Card>
    );
  }

  if (!allOrders && (error || !fetchedOrders)) {
    return (
      <Card className="border border-border/60 shadow-sm transition-all hover:shadow-md">
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Unable to load recent orders.</p>
        </CardContent>
      </Card>
    );
  }

  if (!allOrders) return null;

  const orders = allOrders.slice(0, 5);

  if (orders.length === 0) {
    return (
      <Card className="border border-border/60 shadow-sm transition-all hover:shadow-md">
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
    <Card className="border border-border/60 shadow-sm transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Orders</CardTitle>
        <Button asChild className="hidden sm:flex" size="sm" variant="outline">
          <Link href={ORDERS_ROUTE}>
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {orders.map((order) => (
            <Link
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl bg-transparent hover:bg-muted/30 transition-colors duration-300 gap-4"
              href={getOrderRoute(order.id)}
              key={order.id}
            >
              <div className="flex items-center gap-4">
                <Avatar className="h-9 w-9 hidden sm:flex">
                  <AvatarFallback>
                    <Package className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1.5">
                  <p className="text-sm font-medium leading-none">Order #{order.id}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(order.purchase_date).toLocaleDateString()} · {order.items.length}{' '}
                    {order.items.length === 1 ? 'item' : 'items'}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                <div className="font-medium">${toNum(order.total_price).toFixed(2)}</div>
                <Badge
                  className="uppercase tracking-wider"
                  data-status={order.status.toLowerCase()}
                  variant="secondary"
                >
                  {order.status}
                </Badge>
              </div>
            </Link>
          ))}
        </div>
        <Button asChild className="w-full mt-6 sm:hidden" size="sm" variant="outline">
          <Link href={ORDERS_ROUTE}>
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
