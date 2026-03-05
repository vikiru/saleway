'use client';

import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/features/cart/store/Cart';
import type { Product } from '@/features/product/types/product';
import { Button } from '@/lib/components/ui/button';
import { Card } from '@/lib/components/ui/card';

import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from '@/lib/components/ui/empty';
import { ShoppingBag } from 'lucide-react';

interface CartItemListProps {
  products: Map<string, Product>;
}

export function CartItemList({ products }: CartItemListProps) {
  const { items, updateItem, removeItem } = useCartStore();

  if (items.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <div className="bg-muted flex size-12 items-center justify-center rounded-full mb-4">
            <ShoppingBag className="h-6 w-6 text-muted-foreground" />
          </div>
          <EmptyTitle>Your cart is empty</EmptyTitle>
          <EmptyDescription>Looks like you haven't added anything to your cart yet.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Link href="/search">
            <Button variant="outline">Start Shopping</Button>
          </Link>
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <div className="space-y-6">
      {items.map((item) => {
        const product = products.get(item.productId);
        return (
          <Card className="overflow-hidden" key={item.cartItemId}>
            <div className="p-4 sm:flex sm:items-center sm:justify-between sm:space-x-4">
              <div className="flex items-center space-x-4">
                <div className="shrink-0 relative h-24 w-24">
                  <Image
                    alt={product?.name || item.productId}
                    className="rounded-md object-cover"
                    fill
                    src={product?.image?.image_url || `https://placehold.co/200x200/png?text=${item.productId}`}
                  />
                </div>
                <div>
                  <h3 className="text-base font-medium text-foreground">
                    <Link className="hover:underline" href={`/products/${item.productId}`}>
                      {product?.name || item.productId}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm font-medium text-muted-foreground">${item.unitPrice.toFixed(2)}</p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between sm:mt-0">
                <div className="flex items-center border rounded-md mx-4">
                  <Button
                    className="h-8 w-8 rounded-none border-r"
                    disabled={item.quantity <= 1}
                    onClick={() => updateItem(item.cartItemId, item.quantity - 1)}
                    size="icon"
                    variant="ghost"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <div className="w-10 text-center text-sm font-medium">{item.quantity}</div>
                  <Button
                    className="h-8 w-8 rounded-none border-l"
                    onClick={() => updateItem(item.cartItemId, item.quantity + 1)}
                    size="icon"
                    variant="ghost"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>

                <Button
                  className="text-muted-foreground hover:text-destructive"
                  onClick={() => removeItem(item.cartItemId)}
                  size="icon"
                  variant="ghost"
                >
                  <Trash2 className="h-5 w-5" />
                  <span className="sr-only">Remove</span>
                </Button>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
