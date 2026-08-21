'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import type { CartItem } from '@/entities/cart/types/cart';

import { toNum } from '@/shared/lib/numbers';

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
          const itemQuantity = toNum(item.quantity);
          const itemPrice = toNum(item.unitPrice);
          const existingIndex = state.items.findIndex((i) => i.productId === item.productId);

          if (existingIndex >= 0) {
            state.items[existingIndex].quantity = toNum(state.items[existingIndex].quantity) + itemQuantity;
            state.items[existingIndex].totalPrice =
              toNum(state.items[existingIndex].unitPrice) * state.items[existingIndex].quantity;
            return;
          }

          const cartItemId = crypto.randomUUID();
          state.items.push({
            ...item,
            quantity: itemQuantity,
            unitPrice: itemPrice,
            cartItemId,
            cartId: '',
            totalPrice: itemPrice * itemQuantity,
          });
        });
      },

      updateItem: (cartItemId, quantity) => {
        set((state) => {
          const item = state.items.find((i) => i.cartItemId === cartItemId);
          if (item) {
            const newQuantity = toNum(quantity);
            item.quantity = newQuantity;
            item.totalPrice = toNum(item.unitPrice) * newQuantity;
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
          state.items = items.map((item) => ({
            ...item,
            quantity: toNum(item.quantity),
            unitPrice: toNum(item.unitPrice),
            totalPrice: toNum(item.totalPrice),
          }));
        });
      },

      getTotalPrice: () => {
        const state = get();
        return state.items.reduce((total, item) => total + toNum(item.totalPrice), 0);
      },
    })),
    {
      name: 'cart-storage',
    },
  ),
);

export const selectCartTotal = (state: CartStore) =>
  state.items.reduce((total, item) => total + toNum(item.totalPrice), 0);
