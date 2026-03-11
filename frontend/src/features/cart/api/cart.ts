import type { Cart, CartItem, CartItemCreateInput } from '@/features/cart/types/cart';
import { CART_SERVICE_URL } from '@/lib/constants/routes';
import { handleResponse } from '@/shared/api/fetch';

export async function getCart(userId: string, signal?: AbortSignal): Promise<Cart> {
  const response = await fetch(`${CART_SERVICE_URL}/cart/user/${userId}`, { signal });
  return handleResponse<Cart>(response);
}

export async function createCart(userId: string): Promise<Cart> {
  const response = await fetch(`${CART_SERVICE_URL}/cart/user/${userId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  return handleResponse<Cart>(response);
}
export async function createCartItem(userId: string, data: CartItemCreateInput): Promise<CartItem> {
  const response = await fetch(`${CART_SERVICE_URL}/cart/user/${userId}/item`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse<CartItem>(response);
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
  return handleResponse<CartItem>(response);
}

export async function removeCartItem(userId: string, cartItemId: string): Promise<void> {
  const response = await fetch(`${CART_SERVICE_URL}/cart/user/${userId}/item/${cartItemId}`, {
    method: 'DELETE',
  });
  return handleResponse<void>(response);
}

export async function clearCart(userId: string): Promise<void> {
  const response = await fetch(`${CART_SERVICE_URL}/cart/user/${userId}`, {
    method: 'DELETE',
  });
  return handleResponse<void>(response);
}

export async function syncCart(userId: string, items: CartItemCreateInput[]): Promise<Cart> {
  const response = await fetch(`${CART_SERVICE_URL}/cart/user/${userId}/sync`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(items),
  });
  return handleResponse<Cart>(response);
}
