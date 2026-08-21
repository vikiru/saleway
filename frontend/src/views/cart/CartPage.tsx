import type { Product } from '@/entities/product/types/product';

import { CartInteractiveZone } from './components/CartInteractiveZone';

interface CartPageProps {
  products: Product[];
}

export function CartPage({ products }: CartPageProps) {
  return (
    <main className="container mx-auto min-h-[70vh] px-4 py-8 lg:py-12">
      <h1 className="mb-8 font-bold tracking-tight">Shopping Cart</h1>
      <CartInteractiveZone products={products} />
    </main>
  );
}
