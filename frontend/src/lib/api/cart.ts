import { CART_SERVICE_URL } from '@/lib/routes';
import type { CartItemCreateInput, CartItemsResponse, CartResponse } from '@/lib/types/cart';
import { handleResponse } from './fetch';

export async function fetchCart(userId: string, signal?: AbortSignal): Promise<CartResponse> {
  const response = await fetch(`${CART_SERVICE_URL}/cart/${userId}`, { signal });
  return handleResponse(response);
}

export async function fetchCartItems(userId: string, signal?: AbortSignal): Promise<CartItemsResponse> {
  const response = await fetch(`${CART_SERVICE_URL}/cart/${userId}/items`, { signal });
  return handleResponse(response);
}

export async function addCartItem(userId: string, item: CartItemCreateInput): Promise<CartResponse> {
  const response = await fetch(`${CART_SERVICE_URL}/cart/${userId}/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  return handleResponse(response);
}

export async function updateCartItem(userId: string, cartItemId: string, quantity: number): Promise<CartResponse> {
  const response = await fetch(`${CART_SERVICE_URL}/cart/${userId}/items/${cartItemId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity }),
  });
  return handleResponse(response);
}

export async function removeCartItem(userId: string, cartItemId: string): Promise<CartResponse> {
  const response = await fetch(`${CART_SERVICE_URL}/cart/${userId}/items/${cartItemId}`, { method: 'DELETE' });
  return handleResponse(response);
}

export async function clearCart(userId: string): Promise<CartResponse> {
  const response = await fetch(`${CART_SERVICE_URL}/cart/${userId}`, { method: 'DELETE' });
  return handleResponse(response);
}
