import type { Cart, CartItem } from '@/features/cart/types/cart';
import { CART_SERVICE_URL } from '@/lib/constants/routes';
import { handleResponse } from '@/shared/api/fetch';

export async function getCart(userId: string, signal?: AbortSignal): Promise<Cart> {
  const response = await fetch(`${CART_SERVICE_URL}/cart/user/${userId}`, { signal });
  return handleResponse<Cart>(response);
}

export async function getCartItems(userId: string, signal?: AbortSignal): Promise<CartItem[]> {
  const response = await fetch(`${CART_SERVICE_URL}/cart/user/${userId}`, { signal });
  return handleResponse<CartItem[]>(response);
}
