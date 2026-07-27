import { useState } from 'react';
import { syncCart } from '@/features/cart/actions/cart';
import { useCartStore } from '@/features/cart/store/Cart';
import { createCheckoutSession } from '@/features/payment/actions/checkout';

export function useCheckoutFlow() {
  const { items, getTotalPrice } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (items.length > 0) {
        const cartItems = items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice, // include unitPrice if required by type
        }));
        await syncCart(cartItems);
      }

      const result = await createCheckoutSession();
      if (result.url) {
        window.location.href = result.url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Checkout failed');
      setIsLoading(false);
    }
  };

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.1;
  const shipping = 0.0;
  const total = subtotal + tax + shipping;

  return {
    items,
    isLoading,
    error,
    handleCheckout,
    subtotal,
    tax,
    shipping,
    total,
  };
}
