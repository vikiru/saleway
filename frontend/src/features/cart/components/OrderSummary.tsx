'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useSyncExternalStore } from 'react';

import { useCartStore } from '@/features/cart/store/Cart';
import { Button } from '@/lib/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/lib/components/ui/card';
import { Separator } from '@/lib/components/ui/separator';
import { CHECKOUT_ROUTE, SEARCH_ROUTE } from '@/lib/constants/routes';

const emptySubscribe = () => () => {};

interface OrderSummaryProps {
  className?: string;
}

export function OrderSummary({ className }: OrderSummaryProps) {
  const { items: storeItems, getTotalPrice } = useCartStore();
  const hydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  if (!hydrated) return null;

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.1;
  const shipping = 0.0; // Free Shipping Policy
  const total = subtotal + tax + shipping;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Shipping estimate</span>
          <span className="text-sm font-bold tracking-tight text-green-600 uppercase dark:text-green-400">Free</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Tax estimate</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
        <Separator />
        <div className="flex items-center justify-between text-base font-medium">
          <span>Order total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Link className="w-full" href={CHECKOUT_ROUTE}>
          <Button className="w-full" disabled={storeItems.length === 0} size="lg">
            Proceed to Checkout
          </Button>
        </Link>
        <div className="text-center text-sm">
          <span className="text-muted-foreground">or </span>
          <Link className="inline-flex items-center font-medium text-primary hover:text-primary/80" href={SEARCH_ROUTE}>
            Continue Shopping <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
