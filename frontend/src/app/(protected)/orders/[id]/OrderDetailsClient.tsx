'use client';

import { ArrowLeft, Package } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useOrder } from '@/lib/queries/order';
import { ORDERS_ROUTE } from '@/lib/constants/routes';

const statusStyles: Record<string, string> = {
  delivered: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  processing: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  shipped: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
};

export function OrderDetailsClient({ id, userId }: { id: string; userId: string }) {
  const { data: orderResponse, isLoading, error } = useOrder(id);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Loading order...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !orderResponse?.data) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link href={ORDERS_ROUTE}>
          <Button className="mb-4" variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Orders
          </Button>
        </Link>
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-destructive">Order not found.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const order = orderResponse.data;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href={ORDERS_ROUTE}>
        <Button className="mb-4" variant="ghost">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Orders
        </Button>
      </Link>

      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Order #{order.id}</h1>
          <p className="text-muted-foreground">Placed on {new Date(order.purchaseDate).toLocaleDateString()}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[order.status] || ''}`}>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </span>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              {order.items.length === 0 ? (
                <div className="flex flex-col items-center py-8 text-center">
                  <Package className="h-8 w-8 text-muted-foreground mb-2" />
                  <p>No items in this order.</p>
                </div>
              ) : (
                <ul className="divide-y text-sm">
                  {order.items.map((item) => (
                    <li className="py-4" key={item.id}>
                      <div className="flex gap-4">
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md border">
                          {item.productImage ? (
                            <Image alt={item.productName} className="object-cover" fill src={item.productImage} />
                          ) : (
                            <div className="h-full w-full bg-muted flex items-center justify-center">
                              <Package className="h-8 w-8 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{item.productName}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.productQuantity}</p>
                        </div>
                        <p className="font-medium">${item.productTotalPrice.toFixed(2)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${order.totalPrice.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${order.totalPrice.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
