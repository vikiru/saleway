'use client';

import { CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

import type { OrderResponse } from '@/entities/order/types/order';

import { useCartStore } from '@/entities/cart/store/Cart';
import { CART_ROUTE, getOrderRoute, SEARCH_ROUTE } from '@/shared/config/routes';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';

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
      <main className="flex min-h-[80vh] items-center justify-center p-4">
        <Card className="w-full max-w-md border border-destructive/20 bg-destructive/5 text-center shadow-sm">
          <CardContent className="flex flex-col items-center py-12">
            <div className="rounded-full bg-destructive/10 p-6">
              <XCircle className="h-16 w-16 text-destructive" />
            </div>
            <h1 className="mt-8 font-bold tracking-tight text-destructive">Order Verification Failed</h1>
            <p className="mt-4 px-6 text-center text-muted-foreground">
              {result.error || 'We encountered an error while verifying your session.'}
            </p>
            <div className="mt-10 flex w-full flex-col gap-3 px-6 sm:flex-row">
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
    <main className="flex min-h-[80vh] items-center justify-center p-4">
      <Card className="w-full max-w-lg border-none bg-transparent shadow-none">
        <CardContent className="flex flex-col items-center py-12 text-center">
          <div className="rounded-full bg-green-500/10 p-6 dark:bg-green-500/20">
            <CheckCircle className="h-20 w-20 text-green-600 dark:text-green-400" />
          </div>

          <h1 className="mt-10 font-extrabold tracking-tight">Order Confirmed!</h1>
          <p className="mx-auto mt-4 max-w-md text-xl text-muted-foreground">
            Thank you for your purchase. We've sent a confirmation email to your inbox.
          </p>

          {orderId && (
            <div className="mt-6 rounded-full bg-muted px-4 py-2 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
              Order #{orderId}
            </div>
          )}

          <div className="mt-12 flex w-full max-w-sm flex-col gap-4">
            {orderId && (
              <Link href={getOrderRoute(orderId)} prefetch={false}>
                <Button className="h-12 w-full text-lg font-semibold shadow-sm" size="lg">
                  View Order Status
                </Button>
              </Link>
            )}
            <Link href={SEARCH_ROUTE} prefetch={false}>
              <Button className="h-12 w-full text-lg font-medium" variant="ghost">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
