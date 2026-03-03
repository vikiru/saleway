'use server';

import { handleResponse } from '@/lib/api/fetch';
import { CART_SERVICE_URL } from '@/lib/routes';
import type { CartItemCreateInput, CartResponse } from '@/lib/types/cart';

export async function createCartItem(userId: string, item: CartItemCreateInput): Promise<CartResponse> {
  const response = await fetch(`${CART_SERVICE_URL}/cart/user/${userId}/item`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify([item]),
  });
  return handleResponse(response);
}

export async function updateCartItem(
  userId: string,
  cartItemId: string,
  quantity: number,
  unitPrice: number,
): Promise<CartResponse> {
  const response = await fetch(`${CART_SERVICE_URL}/cart/user/${userId}/item/${cartItemId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cartItemId, quantity, unitPrice, totalPrice: quantity * unitPrice }),
  });
  return handleResponse(response);
}

export async function removeCartItem(userId: string, cartItemId: string): Promise<CartResponse> {
  const response = await fetch(`${CART_SERVICE_URL}/cart/user/${userId}/item/${cartItemId}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
}

export async function clearCart(userId: string): Promise<CartResponse> {
  const response = await fetch(`${CART_SERVICE_URL}/cart/user/${userId}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
}

export async function syncCart(userId: string, items: CartItemCreateInput[]): Promise<{ success: boolean }> {
  const response = await fetch(`${CART_SERVICE_URL}/cart/user/${userId}/sync`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items }),
  });
  return handleResponse(response);
}
