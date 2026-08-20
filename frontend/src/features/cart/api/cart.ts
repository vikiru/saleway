import { z } from 'zod';

import type { Cart, CartItem, CartItemCreateInput } from '@/features/cart/types/cart';

import { cartItemCreateInputSchema, cartItemSchema, cartSchema } from '@/features/cart/schemas/cart';
import { CART_SERVICE_URL } from '@/lib/constants/routes';
import { handleResponse } from '@/shared/api/fetch';

export async function getCart(userId: string, signal?: AbortSignal): Promise<Cart> {
  const response = await fetch(`${CART_SERVICE_URL}/cart/user/${userId}`, { signal });
  const data = await handleResponse<Cart>(response);
  const parsed = cartSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error('Invalid cart response format');
  }
  return parsed.data as Cart;
}

export async function createCart(userId: string): Promise<Cart> {
  const response = await fetch(`${CART_SERVICE_URL}/cart/user/${userId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await handleResponse<Cart>(response);
  const parsed = cartSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error('Invalid cart response format');
  }
  return parsed.data as Cart;
}

export async function createCartItem(userId: string, data: CartItemCreateInput): Promise<CartItem> {
  const inputParsed = cartItemCreateInputSchema.safeParse(data);
  if (!inputParsed.success) {
    throw new Error('Invalid cart item input payload');
  }
  const response = await fetch(`${CART_SERVICE_URL}/cart/user/${userId}/item`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inputParsed.data),
  });
  const responseData = await handleResponse<CartItem>(response);
  const parsed = cartItemSchema.safeParse(responseData);
  if (!parsed.success) {
    throw new Error('Invalid cart item response format');
  }
  return parsed.data as CartItem;
}

export async function updateCartItem(
  userId: string,
  cartItemId: string,
  quantity: number,
  unitPrice: number,
): Promise<CartItem> {
  const response = await fetch(`${CART_SERVICE_URL}/cart/user/${userId}/item/${cartItemId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity, unitPrice }),
  });
  const data = await handleResponse<CartItem>(response);
  const parsed = cartItemSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error('Invalid cart item response format');
  }
  return parsed.data as CartItem;
}

export async function removeCartItem(userId: string, cartItemId: string): Promise<void> {
  const response = await fetch(`${CART_SERVICE_URL}/cart/user/${userId}/item/${cartItemId}`, {
    method: 'DELETE',
  });
  await handleResponse<void>(response);
}

export async function clearCart(userId: string): Promise<void> {
  const response = await fetch(`${CART_SERVICE_URL}/cart/user/${userId}`, {
    method: 'DELETE',
  });
  await handleResponse<void>(response);
}

export async function syncCart(userId: string, items: CartItemCreateInput[]): Promise<Cart> {
  const inputParsed = z.array(cartItemCreateInputSchema).safeParse(items);
  if (!inputParsed.success) {
    throw new Error('Invalid cart sync input payload');
  }
  const response = await fetch(`${CART_SERVICE_URL}/cart/user/${userId}/sync`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inputParsed.data),
  });
  const data = await handleResponse<Cart>(response);
  const parsed = cartSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error('Invalid cart response format');
  }
  return parsed.data as Cart;
}
