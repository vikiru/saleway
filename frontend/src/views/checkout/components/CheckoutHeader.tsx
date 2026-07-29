import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { CART_ROUTE } from '@/lib/constants/routes';

interface CheckoutHeaderProps {
  itemCount: number;
}

export function CheckoutHeader({ itemCount }: CheckoutHeaderProps) {
  return (
    <>
      <Link
        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
        href={CART_ROUTE}
        prefetch={false}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Cart
      </Link>

      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-10">
        <h1 className="font-bold tracking-tight">Checkout</h1>
        <p className="text-muted-foreground">{itemCount} items in your order</p>
      </div>
    </>
  );
}
