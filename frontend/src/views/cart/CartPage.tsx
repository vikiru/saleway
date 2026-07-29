import type { Product } from '@/features/product/types/product';
import { CartInteractiveZone } from './components/CartInteractiveZone';

interface CartPageProps {
  products: Product[];
}

export function CartPage({ products }: CartPageProps) {
  return (
    <main className="container mx-auto px-4 py-8 lg:py-12 min-h-[70vh]">
      <h1 className="font-bold tracking-tight mb-8">Shopping Cart</h1>
      <CartInteractiveZone products={products} />
    </main>
  );
}
