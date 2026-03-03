'use client';

import { useEffect, useState } from 'react';
import { CartItemList } from '@/lib/components/features/cart/CartItemList';
import { OrderSummary } from '@/lib/components/features/cart/OrderSummary';
import { useProducts } from '@/lib/queries/product';
import type { Product } from '@/lib/types/product';

export default function CartPage() {
  const { data: productsResponse } = useProducts();
  const [productsMap, setProductsMap] = useState<Map<string, Product>>(new Map());

  useEffect(() => {
    if (productsResponse?.data) {
      const map = new Map<string, Product>();
      productsResponse.data.forEach((product) => {
        map.set(String(product.id), product);
      });
      setProductsMap(map);
    }
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
