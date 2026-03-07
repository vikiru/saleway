import type { Product } from '@/features/product/types/product';

export interface Cart {
  cartId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  totalPrice: number;
  items: CartItem[];
}

export interface CartItem {
  cartItemId: string;
  productId: string;
  cartId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  product?: Product;
}

export interface CartCreateInput {
  userId: string;
}

export interface CartItemCreateInput {
  productId: string;
  quantity: number;
}

export interface CartUpdateInput {
  quantity?: number;
}

import type { ServiceResponse } from '@/shared/api/types';

export type CartResponse = ServiceResponse<Cart>;
export type CartItemResponse = ServiceResponse<CartItem>;
export type CartItemsResponse = ServiceResponse<CartItem[]>;
