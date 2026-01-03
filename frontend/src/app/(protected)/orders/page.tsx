'use client';

import { ChevronLeft, ChevronRight, Package } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

type OrderStatus = 'delivered' | 'processing' | 'cancelled' | 'shipped';

type Order = {
  id: string;
  date: string;
  status: OrderStatus;
  total: string;
  itemCount: number;
};

export default function OrdersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const orders: Order[] = Array.from({ length: 25 }).map((_, i) => {
    const statuses: OrderStatus[] = ['delivered', 'processing', 'cancelled', 'shipped'];
    const status = statuses[i % 4];
    return {
      id: `WU881911${39 + i}`,
      date: new Date(2023, 9, 15 - (i % 10)).toISOString(),
      status,
      total: `$${(Math.random() * 200 + 50).toFixed(2)}`,
      itemCount: Math.floor(Math.random() * 5) + 1,
    };
  });

  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = orders.slice(startIndex, endIndex);

  return (
    <div className="flex-1 space-y-6 p-8 pt-6 bg-gray-50/50 min-h-screen">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Order History</h2>
          <p className="text-muted-foreground">View and manage your orders</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
          <CardDescription>A list of all orders.</CardDescription>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-gray-100 p-3 mb-4">
                <Package className="h-6 w-6 text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">No orders</h3>
              <p className="mt-1 text-sm text-gray-500">You haven't placed any orders yet.</p>
              <div className="mt-6">
                <Button asChild>
                  <Link href="/">Continue Shopping</Link>
                </Button>
              </div>
            </div>
          ) : (
            <ScrollArea className="h-[calc(100vh-20rem)] pr-4">
              <div className="space-y-6">
                {currentOrders.map((order) => (
                  <div
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6 last:border-0 last:pb-0"
                    key={order.id}
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-9 w-9 hidden sm:flex">
                        <AvatarFallback>
                          <Package className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                        <Link
                          className="text-sm font-medium leading-none hover:underline underline-offset-4"
                          href={`/orders/${order.id}`}
                        >
                          Order #{order.id}
                        </Link>
                        <p className="text-xs text-muted-foreground">
                          {new Date(order.date).toLocaleDateString()} · {order.itemCount}{' '}
                          {order.itemCount === 1 ? 'item' : 'items'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                      <div className="font-medium">{order.total}</div>
                      <Badge className={getStatusColor(order.status)} variant="secondary">
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                      <Button asChild className="h-8 w-8" size="icon" variant="ghost">
                        <Link href={`/orders/${order.id}`}>
                          <ChevronRight className="h-4 w-4" />
                          <span className="sr-only">View Order</span>
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}

          {orders.length > 0 && (
            <div className="flex items-center justify-between py-4 mt-4 border-t">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(endIndex, orders.length)} of {orders.length} results
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  size="sm"
                  variant="outline"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <div className="text-sm font-medium">
                  Page {currentPage} of {totalPages}
                </div>
                <Button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  size="sm"
                  variant="outline"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
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
    case 'cancelled':
      return 'bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-300';
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300';
  }
}
