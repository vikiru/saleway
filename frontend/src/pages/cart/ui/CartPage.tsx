'use client';

import { ArrowLeft, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';
import { CartItemListContainer } from '@/features/cart/components/CartItemListContainer';
import { OrderSummary } from '@/features/cart/components/OrderSummary';
import { useCart } from '@/features/cart/queries/cart';
import { useCartStore } from '@/features/cart/store/Cart';
import { useProducts } from '@/features/product/queries/product';
import { Button } from '@/lib/components/ui/button';
import { CHECKOUT_ROUTE, SEARCH_ROUTE } from '@/lib/constants/routes';

export function CartPage({ userId }: { userId: string }) {
  const { data: productsResponse } = useProducts();
  const { data: cartResponse } = useCart(userId);
  const { setCart } = useCartStore();

  useEffect(() => {
    if (cartResponse?.data && productsResponse?.data) {
      const cartItems = cartResponse.data.items.map((item) => {
        const product = productsResponse.data?.find((p) => p.id === Number(item.productId));
        return {
          ...item,
          product,
        };
      });
      setCart(cartItems);
    }
  }, [cartResponse, productsResponse, setCart]);

  const { items } = useCartStore();

  if (items.length === 0) {
    return (
      <main className="container mx-auto px-4 py-16 text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-muted">
            <ShoppingCart className="h-12 w-12 text-muted-foreground" />
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Looks like you haven't added anything to your cart yet. Explore our products and find something you love!
        </p>
        <Link href={SEARCH_ROUTE} prefetch={false}>
          <Button size="lg">Browse Products</Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 lg:py-12">
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">Shopping Cart</h1>
        <p className="text-muted-foreground">{items.length} items in your cart</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-10 items-start">
        <section className="lg:col-span-8">
          <CartItemListContainer />
        </section>

        <aside className="lg:col-span-4 lg:sticky lg:top-24">
          <OrderSummary />
          <div className="mt-6">
            <Link href={CHECKOUT_ROUTE} prefetch={false}>
              <Button className="w-full h-12 text-base font-semibold" size="lg">
                Proceed to Checkout
              </Button>
            </Link>
            <Link
              className="flex items-center justify-center mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
              href={SEARCH_ROUTE}
              prefetch={false}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
