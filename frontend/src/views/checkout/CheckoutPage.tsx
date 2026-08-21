import type { Product } from '@/entities/product/types/product';

import { CheckoutInteractiveZone } from './components/CheckoutInteractiveZone';

interface CheckoutPageProps {
  onCheckout: () => Promise<{ success: boolean; data?: { url?: string }; error?: string }>;
  products: Product[];
}

export function CheckoutPage({ onCheckout, products }: CheckoutPageProps) {
  return (
    <main className="container mx-auto min-h-[70vh] px-4 py-8 lg:py-12">
      <CheckoutInteractiveZone onCheckout={onCheckout} products={products} />
    </main>
  );
}
