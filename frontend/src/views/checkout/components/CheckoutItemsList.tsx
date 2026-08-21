import { Package } from 'lucide-react';
import Image from 'next/image';

import type { CartItem } from '@/entities/cart/types/cart';
import type { Product } from '@/entities/product/types/product';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

interface CheckoutItemsListProps {
  items: CartItem[];
  products: Product[];
}

export function CheckoutItemsList({ items, products }: CheckoutItemsListProps) {
  const cartWithProducts = items.map((item) => ({
    ...item,
    product: products.find((p) => String(p.id) === item.productId),
  }));

  return (
    <section aria-labelledby="order-items-title" className="space-y-6 lg:col-span-7">
      <Card className="border-none bg-transparent shadow-none">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-xl font-semibold" id="order-items-title">
            Order Items
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 px-0">
          {cartWithProducts.map((item) => (
            <div
              className="flex gap-6 border-b border-border/50 py-4 first:pt-0 last:border-0 last:pb-0"
              key={item.cartItemId}
            >
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-border/40 bg-muted">
                {item.product?.image?.image_url ? (
                  <Image
                    alt={item.product.name}
                    className="object-cover"
                    fill
                    sizes="96px"
                    src={item.product.image.image_url}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-muted">
                    <Package className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-between">
                <div>
                  <p className="truncate text-lg font-semibold">{item.product?.name || 'Product'}</p>
                  <p className="mt-1 text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                </div>
                <p className="text-lg font-medium">
                  ${((item.product?.price || item.unitPrice) * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
