'use client';

import { useAuth } from '@clerk/nextjs';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { getCart } from '@/lib/api/cart';
import { syncCart } from '@/lib/server/actions/carts';
import { useCartStore } from '@/lib/stores/Cart';

export function useCartSync() {
  const { userId, isSignedIn } = useAuth();
  const { setCart, clearCart } = useCartStore();
  const lastUserIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (userId) {
      lastUserIdRef.current = userId;
    }
  }, [userId]);

  useEffect(() => {
    if (isSignedIn && userId) {
      getCart(userId)
        .then((cart) => {
          if (cart?.data?.items && cart.data.items.length > 0) {
            setCart(
              cart.data.items.map((item) => ({
                cartItemId: item.cartItemId,
                cartId: item.cartId,
                productId: item.productId,
                quantity: item.quantity,
                unitPrice: Number(item.unitPrice),
                totalPrice: Number(item.totalPrice),
              })),
            );
          }
        })
        .catch(() => {
          toast.error('Failed to load cart');
        });
    }
  }, [isSignedIn, userId, setCart]);

  useEffect(() => {
    if (!isSignedIn && lastUserIdRef.current) {
      const items = useCartStore.getState().items;
      if (items.length > 0) {
        const syncUserId = lastUserIdRef.current;
        const itemsToSync = items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        }));
        syncCart(syncUserId, itemsToSync)
          .then(() => {
            clearCart();
          })
          .catch(() => {
            toast.error('Failed to save cart');
          });
      }
    }
  }, [isSignedIn, clearCart]);
}
