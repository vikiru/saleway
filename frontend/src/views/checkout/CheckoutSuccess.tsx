'use client';

import { CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';
import { useCartStore } from '@/features/cart/store/Cart';
import type { OrderResponse } from '@/features/order/types/order';
import { Button } from '@/lib/components/ui/button';
import { Card, CardContent } from '@/lib/components/ui/card';
import { CART_ROUTE, getOrderRoute, SEARCH_ROUTE } from '@/lib/constants/routes';

interface CheckoutSuccessProps {
  result: OrderResponse;
  sessionId: string;
}

export function CheckoutSuccess({ result, sessionId }: CheckoutSuccessProps) {
  const { clearCart } = useCartStore();
  const orderId = result.success ? (result.data?.id ?? null) : null;

  useEffect(() => {
    if (result.success) {
      clearCart();
      sessionStorage.setItem(`checkout_success_${sessionId}`, 'true');
      if (orderId) sessionStorage.setItem(`checkout_order_${sessionId}`, String(orderId));
    }
  }, [result.success, orderId, sessionId, clearCart]);

  if (!result.success) {
    return (
      <main className="min-h-[80vh] flex items-center justify-center p-4">
        <Card className="w-full max-w-md border border-destructive/20 shadow-sm bg-destructive/5 text-center">
          <CardContent className="flex flex-col items-center py-12">
            <div className="rounded-full bg-destructive/10 p-6">
              <XCircle className="h-16 w-16 text-destructive" />
            </div>
            <h1 className="font-bold text-destructive tracking-tight mt-8">Order Verification Failed</h1>
            <p className="text-muted-foreground mt-4 text-center px-6">
              {result.error || 'We encountered an error while verifying your session.'}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3 w-full px-6">
              <Link className="flex-1" href={CART_ROUTE} prefetch={false}>
                <Button className="w-full" variant="outline">
                  Return to Cart
                </Button>
              </Link>
              <Link className="flex-1" href={SEARCH_ROUTE} prefetch={false}>
                <Button className="w-full">Continue Shopping</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-[80vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-lg border-none shadow-none bg-transparent">
        <CardContent className="flex flex-col items-center py-12 text-center">
          <div className="rounded-full bg-green-500/10 p-6 dark:bg-green-500/20">
            <CheckCircle className="h-20 w-20 text-green-600 dark:text-green-400" />
          </div>

          <h1 className="font-extrabold mt-10 tracking-tight">Order Confirmed!</h1>
          <p className="text-xl text-muted-foreground mt-4 max-w-md mx-auto">
            Thank you for your purchase. We've sent a confirmation email to your inbox.
          </p>

          {orderId && (
            <div className="mt-6 px-4 py-2 bg-muted rounded-full text-sm font-semibold text-muted-foreground tracking-wide uppercase">
              Order #{orderId}
            </div>
          )}

          <div className="mt-12 flex flex-col gap-4 w-full max-w-sm">
            {orderId && (
              <Link href={getOrderRoute(orderId)} prefetch={false}>
                <Button className="w-full h-12 text-lg font-semibold shadow-sm" size="lg">
                  View Order Status
                </Button>
              </Link>
            )}
            <Link href={SEARCH_ROUTE} prefetch={false}>
              <Button className="w-full h-12 text-lg font-medium" variant="ghost">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
