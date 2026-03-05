'use client';

import { Check, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '@/features/cart/store/Cart';
import { Badge } from '@/lib/components/ui/badge';
import { Button } from '@/lib/components/ui/button';

interface ProductInfoProps {
  product: {
    id: string;
    name: string;
    price: number;
    inStock: boolean;
  };
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      quantity: 1,
      unitPrice: product.price,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="mt-4 lg:mt-0">
      <h1 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">{product.name}</h1>

      <p className="mt-4 text-3xl tracking-tight text-foreground">${product.price.toFixed(2)}</p>

      <div className="mt-6">
        {product.inStock ? (
          <Badge className="bg-green-100 text-green-800" variant="secondary">
            In Stock
          </Badge>
        ) : (
          <Badge className="bg-red-100 text-red-800" variant="secondary">
            Out of Stock
          </Badge>
        )}
      </div>

      <div className="mt-10 flex items-center gap-x-3">
        <Button className="flex-1" disabled={!product.inStock || added} onClick={handleAddToCart} size="lg">
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
      </div>
    </div>
  );
}
