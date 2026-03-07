'use server';

import type { CartItemCreateInput, CartResponse } from '@/features/cart/types/cart';
import { requireUser } from '@/features/user/actions/auth';
import { CART_SERVICE_URL } from '@/lib/constants/routes';
import { handleResponse } from '@/shared/api/fetch';

export async function createCartItem(item: CartItemCreateInput): Promise<CartResponse> {
  const userId = await requireUser();
  const response = await fetch(`${CART_SERVICE_URL}/cart/user/${userId}/item`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify([item]),
  });
  return handleResponse(response);
}

export async function updateCartItem(cartItemId: string, quantity: number, unitPrice: number): Promise<CartResponse> {
  const userId = await requireUser();
  const response = await fetch(`${CART_SERVICE_URL}/cart/user/${userId}/item/${cartItemId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cartItemId, quantity, unitPrice, totalPrice: quantity * unitPrice }),
  });
  return handleResponse(response);
}

export async function removeCartItem(cartItemId: string): Promise<CartResponse> {
  const userId = await requireUser();
  const response = await fetch(`${CART_SERVICE_URL}/cart/user/${userId}/item/${cartItemId}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
}

export async function clearCart(): Promise<CartResponse> {
  const userId = await requireUser();
  const response = await fetch(`${CART_SERVICE_URL}/cart/user/${userId}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
}

export async function syncCart(items: CartItemCreateInput[]): Promise<{ success: boolean }> {
  const userId = await requireUser();
  const response = await fetch(`${CART_SERVICE_URL}/cart/user/${userId}/sync`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items }),
  });
  return handleResponse(response);
}
