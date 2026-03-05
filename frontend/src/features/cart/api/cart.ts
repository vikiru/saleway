import type { CartItemsResponse, CartResponse } from '@/features/cart/types/cart';
import { CART_SERVICE_URL } from '@/lib/routes';
import { handleResponse } from '@/shared/api/fetch';

export async function getCart(userId: string, signal?: AbortSignal): Promise<CartResponse> {
  const response = await fetch(`${CART_SERVICE_URL}/cart/user/${userId}`, { signal });
  return handleResponse(response);
}

export async function getCartItems(userId: string, signal?: AbortSignal): Promise<CartItemsResponse> {
  const response = await fetch(`${CART_SERVICE_URL}/cart/user/${userId}`, { signal });
  return handleResponse(response);
}
