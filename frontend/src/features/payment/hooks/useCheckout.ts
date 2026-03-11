'use client';

import { useEffect, useRef, useState } from 'react';
import { useCartStore } from '@/features/cart/store/Cart';
import { verifyCheckoutSession } from '@/features/payment/actions/checkout';

export type CheckoutStatus = 'loading' | 'success' | 'error';

export function useCheckout(sessionId: string) {
  const { clearCart } = useCartStore();
  const [status, setStatus] = useState<CheckoutStatus>(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem(`checkout_success_${sessionId}`)) {
      return 'success';
    }
    return 'loading';
  });
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<number | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem(`checkout_order_${sessionId}`);
      return saved ? parseInt(saved, 10) : null;
    }
    return null;
  });
  const verificationStarted = useRef(status === 'success');

  useEffect(() => {
    if (!sessionId || verificationStarted.current) {
      return;
    }

    verificationStarted.current = true;

    verifyCheckoutSession(sessionId)
      .then((response) => {
        if (response.success) {
          const id = response.data?.id || null;
          setOrderId(id);
          setStatus('success');
          clearCart();

          // Persist success state locally to prevent flicker on remount/refresh
          sessionStorage.setItem(`checkout_success_${sessionId}`, 'true');
          if (id) sessionStorage.setItem(`checkout_order_${sessionId}`, String(id));
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
