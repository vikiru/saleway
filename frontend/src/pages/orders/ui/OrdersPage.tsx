import { ChevronLeft, ChevronRight, Package, Search } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useOrders } from '@/features/order/queries/order';
import { Badge } from '@/lib/components/ui/badge';
import { Button } from '@/lib/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/lib/components/ui/card';
import { Input } from '@/lib/components/ui/input';
import { ScrollArea } from '@/lib/components/ui/scroll-area';
import { getOrderRoute } from '@/lib/constants/routes';

const ITEMS_PER_PAGE = 10;

const statusStyles: Record<string, string> = {
  delivered: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  processing: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  shipped: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
};

export function OrdersPage({ userId }: { userId: string }) {
  const { data: ordersResponse, isLoading, error } = useOrders(userId);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Loading orders...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-destructive">Failed to load orders.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const allOrders = ordersResponse?.data || [];
  const filteredOrders = allOrders.filter(
    (order) =>
      order.id.toString().includes(searchQuery) ||
      order.items.some((item) => item.productName.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const orders = filteredOrders.slice(startIndex, endIndex);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold">My Orders</h1>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-9"
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search orders..."
            value={searchQuery}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <div className="flex flex-col items-center py-12 text-center">
              <Package className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No orders found</h3>
              <p className="text-muted-foreground mt-1">
                {searchQuery ? 'Try searching for something else.' : "You haven't placed any orders yet."}
              </p>
            </div>
          ) : (
            <ScrollArea className="h-[calc(100vh-400px)] lg:h-auto">
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors gap-4"
                    key={order.id}
                  >
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Package className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link
                          className="text-sm font-medium leading-none hover:underline underline-offset-4"
                          href={getOrderRoute(order.id)}
                        >
                          Order #{order.id}
                        </Link>
                        <p className="text-xs text-muted-foreground">
                          {new Date(order.purchaseDate).toLocaleDateString()} · {order.items.length}{' '}
                          {order.items.length === 1 ? 'item' : 'items'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                      <div className="font-medium">${order.totalPrice.toFixed(2)}</div>
                      <Badge className={statusStyles[order.status] || ''} variant="secondary">
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                      <Button asChild className="h-8 w-8" size="icon" variant="ghost">
                        <Link href={getOrderRoute(order.id)}>
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

          {filteredOrders.length > ITEMS_PER_PAGE && (
            <div className="flex items-center justify-between py-4 mt-4 border-t">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredOrders.length)} of {filteredOrders.length}{' '}
                results
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
