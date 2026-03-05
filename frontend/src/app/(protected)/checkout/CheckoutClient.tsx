'use client';

import { ArrowLeft, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { createCheckoutSession } from '@/lib/server/actions/checkout';
import { useCartStore } from '@/lib/stores/Cart';
import { CART_ROUTE, SEARCH_ROUTE } from '@/lib/constants/routes';
import type { Product } from '@/lib/types/product';

interface CheckoutClientProps {
  userId: string;
  initialCartItems: any[];
}

export function CheckoutClient({ userId, initialCartItems }: CheckoutClientProps) {
  const { items, getTotalPrice } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <main className="container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto border-none shadow-none bg-muted/50">
          <CardContent className="pt-10 pb-10 text-center">
            <h1 className="text-xl font-semibold mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">Add some items to your cart to proceed with checkout.</p>
            <Link href={SEARCH_ROUTE} prefetch={false}>
              <Button size="lg">Browse Products</Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    );
  }

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.1;
  const shipping = 15.0;
  const total = subtotal + tax + shipping;

  const handleCheckout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await createCheckoutSession();
      if (result.url) {
        window.location.href = result.url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Checkout failed');
      setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 lg:py-12">
      <Link
        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
        href={CART_ROUTE}
        prefetch={false}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Cart
      </Link>

      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-10">
        <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">Checkout</h1>
        <p className="text-muted-foreground">{initialCartItems.length} items in your order</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-10 items-start">
        <section aria-labelledby="order-items-title" className="lg:col-span-7 space-y-6">
          <Card className="border-none shadow-none bg-transparent">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-semibold" id="order-items-title">
                Order Items
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 space-y-6">
              {initialCartItems.map((item) => (
                <div
                  className="flex gap-6 py-4 first:pt-0 last:pb-0 border-b last:border-0 border-border/50"
                  key={item.cartItemId}
                >
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-muted border border-border/40">
                    {item.product?.image?.image_url ? (
                      <Image
                        alt={item.product.name}
                        className="object-cover"
                        fill
                        sizes="96px"
                        src={item.product.image.image_url}
                      />
                    ) : (
                      <div className="h-full w-full bg-muted flex items-center justify-center text-muted-foreground text-xs uppercase font-medium">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <p className="font-semibold text-lg truncate">{item.product?.name || 'Product'}</p>
                      <p className="text-sm text-muted-foreground mt-1">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-lg">
                      ${((item.product?.price || item.unitPrice) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <aside aria-labelledby="summary-title" className="lg:col-span-5 lg:sticky lg:top-24">
          <Card className="border border-border/60 shadow-sm bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold" id="summary-title">
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-base">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium font-mono">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium font-mono text-green-600 dark:text-green-400">
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-base">
                <span className="text-muted-foreground">Estimated Tax</span>
                <span className="font-medium font-mono">${tax.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between text-xl font-bold pt-2">
                <span>Total</span>
                <span className="font-mono">${total.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-4 mt-4">
              {error && (
                <div
                  aria-live="polite"
                  className="text-sm font-medium text-destructive bg-destructive/10 p-3 rounded-lg w-full text-center"
                >
                  {error}
                </div>
              )}
              <Button
                className="w-full h-12 text-base font-semibold transition-all hover:-translate-y-px active:translate-y-0"
                disabled={isLoading}
                onClick={handleCheckout}
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Connecting to Payment Gateway...
                  </>
                ) : (
                  'Confirm & Pay'
                )}
              </Button>
              <p className="text-xs text-muted-foreground text-center px-4">
                By clicking "Confirm & Pay", you agree to our Terms of Service and Privacy Policy.
              </p>
            </CardFooter>
          </Card>
        </aside>
      </div>
    </main>
  );
}
