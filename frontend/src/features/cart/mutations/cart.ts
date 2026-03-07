import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CartItemCreateInput } from '@/features/cart/types/cart';
import { cartKeys } from '@/lib/queries/keys';
import { clearCart, createCartItem, removeCartItem, syncCart, updateCartItem } from '@/lib/server/actions/carts';

export function useCreateCartItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, item }: { userId: string; item: CartItemCreateInput }) => createCartItem(item),
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: cartKeys.single(userId) });
    },
  });
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();
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
    }) => updateCartItem(cartItemId, quantity, unitPrice),
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: cartKeys.single(userId) });
    },
  });
}

export function useRemoveCartItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, cartItemId }: { userId: string; cartItemId: string }) => removeCartItem(cartItemId),
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: cartKeys.single(userId) });
    },
  });
}

export function useClearCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (_userId: string) => clearCart(),
    onSuccess: (_, userId) => {
      queryClient.invalidateQueries({ queryKey: cartKeys.single(userId) });
    },
  });
}

export function useSyncCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, items }: { userId: string; items: CartItemCreateInput[] }) => syncCart(items),
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: cartKeys.single(userId) });
    },
  });
}
