'use client';

import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useCheckoutFlow } from '@/features/payment/hooks/useCheckoutFlow';
import type { Product } from '@/features/product/types/product';
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
        <Empty className="max-w-md mx-auto">
          <EmptyHeader>
            <div className="bg-muted flex size-12 items-center justify-center rounded-full mb-4">
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

      <div className="grid lg:grid-cols-12 gap-10 items-start">
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
