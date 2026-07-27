import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  clearCart,
  createCartItemAction,
  removeCartItemAction,
  syncCart,
  updateCartItemAction,
} from '@/features/cart/actions/cart';
import type { CartItemCreateInput } from '@/features/cart/types/cart';
import { cartKeys } from '@/lib/queries/keys';

export function useCreateCartItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ userId, item }: { userId: string; item: CartItemCreateInput }) => {
      const result = await createCartItemAction(userId, item);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: cartKeys.single(userId) });
    },
  });
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      userId,
      cartItemId,
      quantity,
      unitPrice,
    }: {
      userId: string;
      cartItemId: string;
      quantity: number;
      unitPrice: number;
    }) => {
      const result = await updateCartItemAction(userId, cartItemId, quantity, unitPrice);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: cartKeys.single(userId) });
    },
  });
}

export function useRemoveCartItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ userId, cartItemId }: { userId: string; cartItemId: string }) => {
      const result = await removeCartItemAction(userId, cartItemId);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: cartKeys.single(userId) });
    },
  });
}

export function useClearCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (_userId: string) => {
      const result = await clearCart();
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    onSuccess: (_, userId) => {
      queryClient.invalidateQueries({ queryKey: cartKeys.single(userId) });
    },
  });
}

export function useSyncCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ userId: _userId, items }: { userId: string; items: CartItemCreateInput[] }) => {
      const result = await syncCart(items);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: cartKeys.single(userId) });
    },
  });
}
