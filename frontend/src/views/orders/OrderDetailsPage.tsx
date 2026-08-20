'use client';

import { ArrowLeft, Package } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { useOrder } from '@/features/order/queries/order';
import { Button } from '@/lib/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/lib/components/ui/card';
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '@/lib/components/ui/empty';
import { Separator } from '@/lib/components/ui/separator';
import { ORDERS_ROUTE } from '@/lib/constants/routes';

export function OrderDetailsPage({ id }: { id: string }) {
  const { data: orderResponse, isLoading, error } = useOrder(id);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="border border-border/60 shadow-sm transition-all hover:shadow-md">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Loading order...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !orderResponse) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link href={ORDERS_ROUTE}>
          <Button className="mb-4" variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Orders
          </Button>
        </Link>
        <Card className="border border-border/60 shadow-sm transition-all hover:shadow-md">
          <CardContent className="pt-6">
            <p className="text-center text-destructive">Order not found.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const order = orderResponse;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href={ORDERS_ROUTE}>
        <Button className="mb-4" variant="ghost">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Orders
        </Button>
      </Link>

      <div className="mb-10 flex items-start justify-between">
        <div className="space-y-1">
          <h1>Order #{order.id}</h1>
          <p className="text-muted-foreground">Placed on {new Date(order.purchase_date).toLocaleDateString()}</p>
        </div>
        <span
          className="rounded-full px-4 py-1.5 text-sm font-semibold tracking-wide"
          data-status={order.status.toLowerCase()}
        >
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </span>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="border border-border/60 shadow-sm transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              {order.items.length === 0 ? (
                <Empty className="border-none py-8">
                  <EmptyHeader>
                    <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-muted">
                      <Package className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <EmptyTitle>No items found</EmptyTitle>
                    <EmptyDescription>This order doesn't seem to have any items.</EmptyDescription>
                  </EmptyHeader>
                </Empty>
              ) : (
                <ul className="divide-y text-sm">
                  {order.items.map((item) => (
                    <li className="py-4" key={item.id}>
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md border">
                          {item.product_image ? (
                            <Image alt={item.product_name} className="object-cover" fill src={item.product_image} />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-muted">
                              <Package className="h-8 w-8 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium">{item.product_name}</p>
                          <p className="mt-1 text-sm text-muted-foreground">Qty: {item.product_quantity}</p>
                        </div>
                        <p className="font-medium sm:ml-auto">${item.product_total_price.toFixed(2)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border border-border/60 shadow-sm transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${order.total_price.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${order.total_price.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
