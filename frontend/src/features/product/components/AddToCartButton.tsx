'use client';

import { Check, ShoppingCart } from 'lucide-react';

import { useAddToCart } from '@/features/product/hooks/useAddToCart';
import { Button } from '@/lib/components/ui/button';

interface AddToCartButtonProps {
  productId: string;
  price: number;
  disabled: boolean;
}

export function AddToCartButton({ productId, price, disabled }: AddToCartButtonProps) {
  const { added, handleAddToCart } = useAddToCart({ productId, price });

  return (
    <Button className="flex-1" disabled={disabled || added} onClick={handleAddToCart} size="lg">
      {added ? (
        <>
          <Check className="mr-2 h-5 w-5" />
          Added to Cart
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to Cart
        </>
      )}
    </Button>
  );
}
