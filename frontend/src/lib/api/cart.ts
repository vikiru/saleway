import { handleResponse } from '@/lib/api/fetch';
import { CART_SERVICE_URL } from '@/lib/routes';
import type { CartItemsResponse, CartResponse } from '@/lib/types/cart';

export async function getCart(userId: string, signal?: AbortSignal): Promise<CartResponse> {
  const response = await fetch(`${CART_SERVICE_URL}/cart/user/${userId}`, { signal });
  return handleResponse(response);
}

export async function getCartItems(userId: string, signal?: AbortSignal): Promise<CartItemsResponse> {
  const response = await fetch(`${CART_SERVICE_URL}/cart/user/${userId}`, { signal });
  return handleResponse(response);
}
