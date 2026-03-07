'use client';

import { useEffect, useRef, useState } from 'react';
import { useCartStore } from '@/features/cart/store/Cart';
import { verifyCheckoutSession } from '@/features/payment/actions/checkout';

export type CheckoutStatus = 'loading' | 'success' | 'error';

export function useCheckout(sessionId: string) {
  const { clearCart } = useCartStore();
  const [status, setStatus] = useState<CheckoutStatus>('loading');
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<number | null>(null);
  const verificationStarted = useRef(false);

  useEffect(() => {
    if (!sessionId || verificationStarted.current) {
      return;
    }

    verificationStarted.current = true;

    verifyCheckoutSession(sessionId)
      .then((response) => {
        if (response.success) {
          setOrderId(response.data?.id || null);
          setStatus('success');
          clearCart();
        } else {
          setStatus('error');
          setError(response.error || 'Verification failed');
        }
      })
      .catch((err) => {
        setStatus('error');
        setError(err instanceof Error ? err.message : 'Verification failed');
      });
  }, [sessionId, clearCart]);

  return {
    status,
    error,
    orderId,
  };
}
