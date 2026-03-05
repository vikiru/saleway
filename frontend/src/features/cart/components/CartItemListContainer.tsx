'use client';

import { useEffect, useState } from 'react';
import { CartItemList } from '@/features/cart/components/CartItemList';
import { useCartStore } from '@/features/cart/store/Cart';
import { getProduct } from '@/features/product/api/product';
import type { Product } from '@/features/product/types/product';

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
