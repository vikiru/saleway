'use client';

import { useEffect, useState } from 'react';
import { getProduct } from '@/lib/api/product';
import { useCartStore } from '@/lib/stores/Cart';
import type { Product } from '@/lib/types/product';
import { CartItemList } from '@/lib/components/features/cart/CartItemList';

export function CartItemListContainer() {
  const items = useCartStore((state) => state.items);
  const [products, setProducts] = useState<Map<string, Product>>(new Map());

  useEffect(() => {
    const productMap = new Map<string, Product>();
    const uniqueProductIds = [...new Set(items.map((item) => item.productId))];

    uniqueProductIds.forEach((productId) => {
      const response = getProduct(Number(productId));
      if (response.success && response.data) {
        productMap.set(productId, response.data);
      }
    });

    setProducts(productMap);
  }, [items]);

  return <CartItemList products={products} />;
}
