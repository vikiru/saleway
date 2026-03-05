'use client';

import { CheckCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { verifyCheckoutSession } from '@/lib/server/actions/checkout';
import { SEARCH_ROUTE, getOrderRoute, CART_ROUTE } from '@/lib/constants/routes';

interface CheckoutSuccessClientProps {
  userId: string;
  sessionId: string;
}

export function CheckoutSuccessClient({ userId, sessionId }: CheckoutSuccessClientProps) {
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<number | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setStatus('error');
      setError('No session ID provided');
      return;
    }

    verifyCheckoutSession(sessionId)
      .then((order) => {
        setOrderId(order.data?.id || null);
        setStatus('success');
      })
      .catch((err) => {
        setStatus('error');
        setError(err instanceof Error ? err.message : 'Verification failed');
      });
  }, [sessionId]);

  if (status === 'loading') {
    return (
      <main className="min-h-[80vh] flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-none shadow-none bg-transparent">
          <CardContent className="flex flex-col items-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <h1 className="text-2xl font-bold mt-8 tracking-tight">Processing your order</h1>
            <p className="text-muted-foreground mt-2 text-center max-w-[280px]">
              Please wait while we confirm your payment and secure your items.
            </p>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (status === 'error') {
    return (
      <main className="min-h-[80vh] flex items-center justify-center p-4">
        <Card className="w-full max-w-md border border-destructive/20 shadow-sm bg-destructive/5 text-center">
          <CardContent className="flex flex-col items-center py-12">
            <h1 className="text-2xl font-bold text-destructive tracking-tight">Order Verification Failed</h1>
            <p className="text-muted-foreground mt-4 text-center px-6">
              {error || 'We encountered an error while verifying your session.'}
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

          <h1 className="text-4xl font-extrabold mt-10 tracking-tight lg:text-5xl">Order Confirmed!</h1>
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
