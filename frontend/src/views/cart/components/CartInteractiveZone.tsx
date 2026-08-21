'use client';

import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

import type { Product } from '@/entities/product/types/product';

import { CartItemList } from '@/entities/cart/components/CartItemList';
import { OrderSummary } from '@/entities/cart/components/OrderSummary';
import { useCartStore } from '@/entities/cart/store/Cart';
import { SEARCH_ROUTE } from '@/shared/config/routes';
import { Button } from '@/shared/ui/button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/shared/ui/empty';

interface CartInteractiveZoneProps {
  products: Product[];
}

export function CartInteractiveZone({ products }: CartInteractiveZoneProps) {
  const { items } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center pt-12 pb-24">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ShoppingCart />
            </EmptyMedia>
            <EmptyTitle>Your cart is empty</EmptyTitle>
            <EmptyDescription>
              Looks like you haven't added anything to your cart yet. Explore our products and find something you love!
            </EmptyDescription>
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

  const productMap = new Map<string, Product>();
  products.forEach((p) => {
    productMap.set(String(p.id), p);
  });

  return (
    <>
      <div className="mb-8 flex justify-end">
        <p className="text-muted-foreground">{items.length} items in your cart</p>
      </div>

      <div className="grid items-start gap-10 lg:grid-cols-12">
        <section className="lg:col-span-8">
          <CartItemList products={productMap} />
        </section>

        <aside className="lg:sticky lg:top-24 lg:col-span-4">
          <OrderSummary />
        </aside>
      </div>
    </>
  );
}
