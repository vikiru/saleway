import Image from 'next/image';
import type { CartItem } from '@/features/cart/types/cart';
import type { Product } from '@/features/product/types/product';
import { Card, CardContent, CardHeader, CardTitle } from '@/lib/components/ui/card';

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
    <section aria-labelledby="order-items-title" className="lg:col-span-7 space-y-6">
      <Card className="border-none shadow-none bg-transparent">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-xl font-semibold" id="order-items-title">
            Order Items
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 space-y-6">
          {cartWithProducts.map((item) => (
            <div
              className="flex gap-6 py-4 first:pt-0 last:pb-0 border-b last:border-0 border-border/50"
              key={item.cartItemId}
            >
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-muted border border-border/40">
                {item.product?.image?.image_url ? (
                  <Image
                    alt={item.product.name}
                    className="object-cover"
                    fill
                    sizes="96px"
                    src={item.product.image.image_url}
                  />
                ) : (
                  <div className="h-full w-full bg-muted flex items-center justify-center text-muted-foreground text-xs uppercase font-medium">
                    No image
                  </div>
                )}
              </div>
              <div className="flex-1 flex flex-col justify-between min-w-0">
                <div>
                  <p className="font-semibold text-lg truncate">{item.product?.name || 'Product'}</p>
                  <p className="text-sm text-muted-foreground mt-1">Quantity: {item.quantity}</p>
                </div>
                <p className="font-medium text-lg">
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
