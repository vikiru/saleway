'use client';

import { useState } from 'react';
import { useCartStore } from '@/features/cart/store/Cart';

interface UseAddToCartProps {
  productId: string;
  price: number;
}

export function useAddToCart({ productId, price }: UseAddToCartProps) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      productId,
      quantity: 1,
      unitPrice: price,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return { added, handleAddToCart };
}
