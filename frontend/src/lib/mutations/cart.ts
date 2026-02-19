import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addCartItem, clearCart, removeCartItem, updateCartItem } from '@/lib/api/cart';
import { cartItemsQueryKey, cartQueryKey } from '@/lib/queries/keys';
import type { CartItemCreateInput, CartResponse } from '@/lib/types/cart';

export function useAddCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, item }: { userId: string; item: CartItemCreateInput }) => addCartItem(userId, item),
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: cartQueryKey(userId) });
      queryClient.invalidateQueries({ queryKey: cartItemsQueryKey(userId) });
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
    }) => updateCartItem(userId, cartItemId, quantity, unitPrice),
    onMutate: async ({ userId, cartItemId, quantity, unitPrice }) => {
      await queryClient.cancelQueries({ queryKey: cartQueryKey(userId) });
      const previousCart = queryClient.getQueryData<CartResponse>(cartQueryKey(userId));

      queryClient.setQueryData<CartResponse>(cartQueryKey(userId), (old) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: {
            ...old.data,
            items: old.data.items.map((item) =>
              item.cartItemId === cartItemId ? { ...item, quantity, totalPrice: item.unitPrice * quantity } : item,
            ),
          },
        };
      });

      return { previousCart };
    },
    onError: (_err, { userId }, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(cartQueryKey(userId), context.previousCart);
      }
    },
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: cartQueryKey(userId) });
      queryClient.invalidateQueries({ queryKey: cartItemsQueryKey(userId) });
    },
  });
}

export function useRemoveCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, cartItemId }: { userId: string; cartItemId: string }) => removeCartItem(userId, cartItemId),
    onMutate: async ({ userId, cartItemId }) => {
      await queryClient.cancelQueries({ queryKey: cartQueryKey(userId) });
      const previousCart = queryClient.getQueryData<CartResponse>(cartQueryKey(userId));

      queryClient.setQueryData<CartResponse>(cartQueryKey(userId), (old) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: {
            ...old.data,
            items: old.data.items.filter((item) => item.cartItemId !== cartItemId),
          },
        };
      });

      return { previousCart };
    },
    onError: (_err, { userId }, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(cartQueryKey(userId), context.previousCart);
      }
    },
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: cartQueryKey(userId) });
      queryClient.invalidateQueries({ queryKey: cartItemsQueryKey(userId) });
    },
  });
}

export function useClearCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => clearCart(userId),
    onSuccess: (_, userId) => {
      queryClient.invalidateQueries({ queryKey: cartQueryKey(userId) });
      queryClient.invalidateQueries({ queryKey: cartItemsQueryKey(userId) });
    },
  });
}
