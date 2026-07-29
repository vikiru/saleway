import type { Product } from '@/features/product/types/product';
import { CheckoutInteractiveZone } from './components/CheckoutInteractiveZone';

interface CheckoutPageProps {
  onCheckout: () => Promise<{ success: boolean; data?: { url?: string }; error?: string }>;
  products: Product[];
}

export function CheckoutPage({ onCheckout, products }: CheckoutPageProps) {
  return (
    <main className="container mx-auto px-4 py-8 lg:py-12 min-h-[70vh]">
      <CheckoutInteractiveZone onCheckout={onCheckout} products={products} />
    </main>
  );
}
