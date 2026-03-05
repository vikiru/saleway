'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '@/lib/stores/Cart';

interface OrderSummaryProps {
  className?: string;
}

export function OrderSummary({ className }: OrderSummaryProps) {
  const { items, getTotalPrice } = useCartStore();

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.1;
  const shipping = items.length > 0 ? 15.0 : 0;
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
          <span className="font-medium">${shipping.toFixed(2)}</span>
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
        <Link className="w-full" href="/checkout">
          <Button className="w-full" disabled={items.length === 0} size="lg">
            Checkout
          </Button>
        </Link>
        <div className="text-center text-sm">
          <span className="text-muted-foreground">or </span>
          <Link className="font-medium text-primary hover:text-primary/80 inline-flex items-center" href="/search">
            Continue Shopping <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
