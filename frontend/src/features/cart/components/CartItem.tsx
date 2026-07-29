import { Minus, Package, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { CartItem as CartItemType } from '@/features/cart/types/cart';
import type { Product } from '@/features/product/types/product';
import { Button } from '@/lib/components/ui/button';
import { Card } from '@/lib/components/ui/card';

interface CartItemProps {
  item: CartItemType;
  product?: Product;
  onUpdateQuantity: (cartItemId: string, quantity: number) => void;
  onRemove: (cartItemId: string) => void;
}

export function CartItem({ item, product, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <Card className="overflow-hidden">
      <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
        <div className="flex items-center gap-4">
          <div className="shrink-0 relative h-24 w-24 bg-muted rounded-md overflow-hidden">
            {product?.image?.image_url ? (
              <Image
                alt={product?.name || item.productId}
                className="rounded-md object-cover"
                fill
                src={product.image.image_url}
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <Package className="h-8 w-8 text-muted-foreground" />
              </div>
            )}
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
              onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
              size="icon"
              variant="ghost"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <div className="w-10 text-center text-sm font-medium">{item.quantity}</div>
            <Button
              className="h-8 w-8 rounded-none border-l"
              onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
              size="icon"
              variant="ghost"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <Button
            className="text-muted-foreground hover:text-destructive"
            onClick={() => onRemove(item.cartItemId)}
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
}
