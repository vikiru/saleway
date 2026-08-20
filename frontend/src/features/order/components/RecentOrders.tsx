'use client';

import { ArrowRight, Package } from 'lucide-react';
import Link from 'next/link';

import type { Order } from '@/features/order/types/order';

import { useOrders } from '@/features/order/queries/order';
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
              className="flex flex-col items-start justify-between gap-4 rounded-xl bg-transparent p-4 transition-colors duration-300 hover:bg-muted/30 sm:flex-row sm:items-center"
              href={getOrderRoute(order.id)}
              key={order.id}
            >
              <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarFallback>
                    <Package className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1.5">
                  <p className="text-sm leading-none font-medium">Order #{order.id}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(order.purchase_date).toLocaleDateString()} · {order.items.length}{' '}
                    {order.items.length === 1 ? 'item' : 'items'}
                  </p>
                </div>
              </div>
              <div className="flex w-full items-center justify-between gap-6 sm:w-auto sm:justify-end">
                <div className="font-medium">${toNum(order.total_price).toFixed(2)}</div>
                <Badge
                  className="tracking-wider uppercase"
                  data-status={order.status.toLowerCase()}
                  variant="secondary"
                >
                  {order.status}
                </Badge>
              </div>
            </Link>
          ))}
        </div>
        <Button asChild className="mt-6 w-full sm:hidden" size="sm" variant="outline">
          <Link href={ORDERS_ROUTE}>
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
