'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { CartItem } from '@/features/cart/types/cart';

interface AddCartItemInput {
  productId: string;
  quantity: number;
  unitPrice: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: AddCartItemInput) => void;
  updateItem: (cartItemId: string, quantity: number) => void;
  removeItem: (cartItemId: string) => void;
  clearCart: () => void;
  setCart: (items: CartItem[]) => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    immer((set, get) => ({
      items: [],

      addItem: (item) => {
        set((state) => {
          const existingIndex = state.items.findIndex((i) => i.productId === item.productId);

          if (existingIndex >= 0) {
            state.items[existingIndex].quantity += item.quantity;
            state.items[existingIndex].totalPrice =
              state.items[existingIndex].unitPrice * state.items[existingIndex].quantity;
            return;
          }

          const cartItemId = crypto.randomUUID();
          state.items.push({
            ...item,
            cartItemId,
            cartId: '',
            totalPrice: item.unitPrice * item.quantity,
          });
        });
      },

      updateItem: (cartItemId, quantity) => {
        set((state) => {
          const item = state.items.find((i) => i.cartItemId === cartItemId);
          if (item) {
            item.quantity = quantity;
            item.totalPrice = item.unitPrice * quantity;
          }
        });
      },

      removeItem: (cartItemId) => {
        set((state) => {
          state.items = state.items.filter((i) => i.cartItemId !== cartItemId);
        });
      },

      clearCart: () => set({ items: [] }),

      setCart: (items) => {
        set((state) => {
          state.items = items;
        });
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.totalPrice, 0);
      },
    })),
    {
      name: 'cart-storage',
    },
  ),
);
