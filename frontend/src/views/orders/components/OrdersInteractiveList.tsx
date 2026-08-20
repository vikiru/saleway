'use client';

import { ChevronLeft, ChevronRight, Package } from 'lucide-react';
import Link from 'next/link';

import { useOrdersList } from '@/features/order/hooks/useOrdersList';
import { Badge } from '@/lib/components/ui/badge';
import { Button } from '@/lib/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/lib/components/ui/card';
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/lib/components/ui/empty';
import { ScrollArea } from '@/lib/components/ui/scroll-area';
import { getOrderRoute } from '@/lib/constants/routes';
import { toNum } from '@/shared/utils/numbers';

export function OrdersInteractiveList({ userId }: { userId: string }) {
  const { orders, searchQuery, currentPage, setCurrentPage, totalPages, totalCount } = useOrdersList(userId);
  const startIndex = (currentPage - 1) * 10;

  return (
    <Card className="border border-border/60 shadow-sm transition-all hover:shadow-md">
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Empty className="border-none p-0">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Package />
                </EmptyMedia>
                <EmptyTitle>No orders found</EmptyTitle>
                <EmptyDescription>
                  {searchQuery ? 'Try searching for something else.' : "You haven't placed any orders yet."}
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </div>
        ) : (
          <ScrollArea className="h-[calc(100vh-400px)] lg:h-auto">
            <div className="space-y-4">
              {orders.map((order) => (
                <Link
                  className="flex flex-col items-start justify-between gap-4 rounded-xl bg-transparent p-4 transition-colors duration-300 hover:bg-muted/30 sm:flex-row sm:items-center"
                  href={getOrderRoute(order.id)}
                  key={order.id}
                >
                  <div className="flex w-full items-center gap-4 sm:w-auto">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                      <div className="text-sm leading-none font-medium">Order #{order.id}</div>
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
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Link>
              ))}
            </div>
          </ScrollArea>
        )}

        {totalCount > 10 && (
          <div className="mt-4 flex flex-col items-center justify-between gap-4 border-t py-4 sm:flex-row">
            <div className="text-center text-sm text-muted-foreground sm:text-left">
              Showing {startIndex + 1} to {Math.min(startIndex + orders.length, totalCount)} of {totalCount} results
            </div>
            <div className="flex items-center space-x-2">
              <Button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                size="sm"
                variant="outline"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <div className="text-sm font-medium">
                Page {currentPage} of {totalPages}
              </div>
              <Button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                size="sm"
                variant="outline"
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
