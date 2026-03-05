import { useMutation } from '@tanstack/react-query';
import type { CartItemCreateInput } from '@/features/cart/types/cart';
import { clearCart, createCartItem, removeCartItem, syncCart, updateCartItem } from '@/lib/server/actions/carts';

export function useCreateCartItem() {
  return useMutation({
    mutationFn: ({ userId, item }: { userId: string; item: CartItemCreateInput }) => createCartItem(userId, item),
  });
}

export function useUpdateCartItem() {
  return useMutation({
    mutationFn: ({
      userId,
      cartItemId,
      quantity,
      unitPrice,
    }: {
      userId: string;
      cartItemId: string;
      quantity: number;
      unitPrice: number;
    }) => updateCartItem(userId, cartItemId, quantity, unitPrice),
  });
}

export function useRemoveCartItem() {
  return useMutation({
    mutationFn: ({ userId, cartItemId }: { userId: string; cartItemId: string }) => removeCartItem(userId, cartItemId),
  });
}

export function useClearCart() {
  return useMutation({
    mutationFn: (userId: string) => clearCart(userId),
  });
}

export function useSyncCart() {
  return useMutation({
    mutationFn: ({ userId, items }: { userId: string; items: CartItemCreateInput[] }) => syncCart(userId, items),
  });
}
