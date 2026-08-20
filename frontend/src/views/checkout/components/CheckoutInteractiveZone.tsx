'use client';

import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';

import type { Product } from '@/features/product/types/product';

import { useCheckoutFlow } from '@/features/payment/hooks/useCheckoutFlow';
import { Button } from '@/lib/components/ui/button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from '@/lib/components/ui/empty';
import { SEARCH_ROUTE } from '@/lib/constants/routes';

import { CheckoutHeader } from './CheckoutHeader';
import { CheckoutItemsList } from './CheckoutItemsList';
import { CheckoutSummary } from './CheckoutSummary';

interface CheckoutInteractiveZoneProps {
  onCheckout: () => Promise<{ success: boolean; data?: { url?: string }; error?: string }>;
  products: Product[];
}

export function CheckoutInteractiveZone({ onCheckout, products }: CheckoutInteractiveZoneProps) {
  const { items, isLoading, error, handleCheckout, subtotal, tax, shipping, total } = useCheckoutFlow(onCheckout);

  if (items.length === 0) {
    return (
      <div className="py-32">
        <Empty className="mx-auto max-w-md">
          <EmptyHeader>
            <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-muted">
              <ShoppingBag className="h-6 w-6 text-muted-foreground" />
            </div>
            <EmptyTitle>Your cart is empty</EmptyTitle>
            <EmptyDescription>Add some items to your cart to proceed with checkout.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Link href={SEARCH_ROUTE} prefetch={false}>
              <Button size="lg">Browse Products</Button>
            </Link>
          </EmptyContent>
        </Empty>
      </div>
    );
  }

  return (
    <>
      <CheckoutHeader itemCount={items.length} />

      <div className="grid items-start gap-10 lg:grid-cols-12">
        <CheckoutItemsList items={items} products={products} />
        <CheckoutSummary
          error={error}
          isLoading={isLoading}
          onCheckout={handleCheckout}
          shipping={shipping}
          subtotal={subtotal}
          tax={tax}
          total={total}
        />
      </div>
    </>
  );
}
