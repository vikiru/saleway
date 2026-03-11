'use client';

import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { CartItemList } from '@/features/cart/components/CartItemList';
import { OrderSummary } from '@/features/cart/components/OrderSummary';
import { useCartStore } from '@/features/cart/store/Cart';
import type { Product } from '@/features/product/types/product';
import { Button } from '@/lib/components/ui/button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/lib/components/ui/empty';
import { SEARCH_ROUTE } from '@/lib/constants/routes';

interface CartPageProps {
  products: Product[];
}

export function CartPage({ products }: CartPageProps) {
  const { items } = useCartStore();

  if (items.length === 0) {
    return (
      <main className="container mx-auto px-4 min-h-[70vh] flex flex-col items-center justify-center">
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
      </main>
    );
  }

  const productMap = new Map<string, Product>();
  products.forEach((p) => {
    productMap.set(String(p.id), p);
  });

  return (
    <main className="container mx-auto px-4 py-8 lg:py-12">
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">Shopping Cart</h1>
        <p className="text-muted-foreground">{items.length} items in your cart</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-10 items-start">
        <section className="lg:col-span-8">
          <CartItemList products={productMap} />
        </section>

        <aside className="lg:col-span-4 lg:sticky lg:top-24">
          <OrderSummary />
        </aside>
      </div>
    </main>
  );
}
