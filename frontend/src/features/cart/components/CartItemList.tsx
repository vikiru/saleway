'use client';

import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/features/cart/store/Cart';
import type { Product } from '@/features/product/types/product';
import { Button } from '@/lib/components/ui/button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from '@/lib/components/ui/empty';
import { ScrollArea } from '@/lib/components/ui/scroll-area';
import { SEARCH_ROUTE } from '@/lib/constants/routes';
import { CartItem } from './CartItem';

interface CartItemListProps {
  products: Map<string, Product>;
}

export function CartItemList({ products }: CartItemListProps) {
  const { items, updateItem, removeItem } = useCartStore();

  if (items.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <div aria-hidden="true" className="bg-muted flex size-12 items-center justify-center rounded-full mb-4">
            <ShoppingBag className="h-6 w-6 text-muted-foreground" />
          </div>
          <EmptyTitle>Your cart is empty</EmptyTitle>
          <EmptyDescription>Looks like you haven't added anything to your cart yet.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Link href={SEARCH_ROUTE}>
            <Button variant="outline">Start Shopping</Button>
          </Link>
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <ScrollArea className="h-[60vh] pr-4">
      <div className="space-y-6">
        {items.map((item) => (
          <CartItem
            item={item}
            key={item.cartItemId}
            onRemove={removeItem}
            onUpdateQuantity={updateItem}
            product={products.get(item.productId)}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
