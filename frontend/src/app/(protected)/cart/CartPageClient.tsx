'use client';

import { useEffect, useState, useMemo } from 'react';
import { useAuth } from '@clerk/nextjs';
import { CartItemList } from '@/lib/components/features/cart/CartItemList';
import { OrderSummary } from '@/lib/components/features/cart/OrderSummary';
import { useProducts } from '@/lib/queries/product';
import { useCart } from '@/lib/queries/cart';
import { useCartStore } from '@/lib/stores/Cart';
import type { Product } from '@/lib/types/product';

export function CartPageClient() {
  const { userId } = useAuth();
  const { data: productsResponse } = useProducts();
  const { data: cartResponse } = useCart(userId || '');
  const { setCart } = useCartStore();

  // Sync Query data to Zustand store on initial load/hydration
  useEffect(() => {
    if (cartResponse?.data?.items) {
      setCart(cartResponse.data.items.map(item => ({
        cartItemId: item.cartItemId,
        cartId: item.cartId,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: Number(item.unitPrice),
        totalPrice: Number(item.totalPrice),
      })));
    }
  }, [cartResponse, setCart]);

  const productsMap = useMemo(() => {
    const map = new Map<string, Product>();
    if (productsResponse?.data) {
      productsResponse.data.forEach((product) => {
        map.set(String(product.id), product);
      });
    }
    return map;
  }, [productsResponse]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CartItemList products={productsMap} />
        </div>
        <div>
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
