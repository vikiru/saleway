import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { CART_ROUTE } from '@/shared/config/routes';

interface CheckoutHeaderProps {
  itemCount: number;
}

export function CheckoutHeader({ itemCount }: CheckoutHeaderProps) {
  return (
    <>
      <Link
        className="mb-8 inline-flex items-center rounded-sm text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
        href={CART_ROUTE}
        prefetch={false}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Cart
      </Link>

      <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-baseline">
        <h1 className="font-bold tracking-tight">Checkout</h1>
        <p className="text-muted-foreground">{itemCount} items in your order</p>
      </div>
    </>
  );
}
