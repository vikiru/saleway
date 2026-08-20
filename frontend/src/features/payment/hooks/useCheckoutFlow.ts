'use client';

import { useState } from 'react';

import { syncCart } from '@/features/cart/actions/cart';
import { useCartStore } from '@/features/cart/store/Cart';

type CheckoutAction = () => Promise<{ success: boolean; data?: { url?: string }; error?: string }>;

export function useCheckoutFlow(checkoutAction: CheckoutAction) {
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
          unitPrice: item.unitPrice,
        }));
        await syncCart(cartItems);
      }

      const result = await checkoutAction();
      if (result.success && result.data?.url) {
        window.location.href = result.data.url;
      } else if (!result.success) {
        throw new Error(result.error || 'Failed to create checkout session');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Checkout failed. Please try again.');
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
