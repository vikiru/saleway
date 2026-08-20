'use server';

import type { Cart, CartItemCreateInput, CartItemResponse, CartResponse } from '@/features/cart/types/cart';
import type { ServiceResponse } from '@/shared/api/types';

import {
  clearCart as clearCartApi,
  createCart as createCartApi,
  createCartItem as createCartItemApi,
  getCart as getCartApi,
  removeCartItem as removeCartItemApi,
  syncCart as syncCartApi,
  updateCartItem as updateCartItemApi,
} from '@/features/cart/api/cart';
import { requireUser } from '@/features/user/actions/auth';

export async function getCartAction(userId: string): Promise<Cart> {
  return getCartApi(userId);
}

export async function createCartAction(): Promise<CartResponse> {
  try {
    const userId = await requireUser();
    const result = await createCartApi(userId);
    return { success: true, message: 'Cart created', data: result };
  } catch (error: unknown) {
    console.error('[createCartAction]', error);
    return { success: false, error: 'Failed to create cart. Please try again.' };
  }
}

export async function createCartItemAction(userId: string, item: CartItemCreateInput): Promise<CartItemResponse> {
  try {
    const result = await createCartItemApi(userId, item);
    return { success: true, message: 'Item added to cart', data: result };
  } catch (error: unknown) {
    console.error('[createCartItemAction]', error);
    return { success: false, error: 'Failed to add item to cart. Please try again.' };
  }
}

export async function updateCartItemAction(
  userId: string,
  cartItemId: string,
  quantity: number,
  unitPrice: number,
): Promise<CartItemResponse> {
  try {
    const result = await updateCartItemApi(userId, cartItemId, quantity, unitPrice);
    return { success: true, message: 'Cart updated', data: result };
  } catch (error: unknown) {
    console.error('[updateCartItemAction]', error);
    return { success: false, error: 'Failed to update cart. Please try again.' };
  }
}

export async function removeCartItemAction(userId: string, cartItemId: string): Promise<ServiceResponse<void>> {
  try {
    await removeCartItemApi(userId, cartItemId);
    return { success: true, message: 'Item removed from cart', data: undefined };
  } catch (error: unknown) {
    console.error('[removeCartItemAction]', error);
    return { success: false, error: 'Failed to remove item. Please try again.' };
  }
}

export async function clearCart(): Promise<ServiceResponse<void>> {
  try {
    const userId = await requireUser();
    await clearCartApi(userId);
    return { success: true, message: 'Cart cleared', data: undefined };
  } catch (error: unknown) {
    console.error('[clearCart]', error);
    return { success: false, error: 'Failed to clear cart. Please try again.' };
  }
}

export async function syncCart(items: CartItemCreateInput[]): Promise<CartResponse> {
  try {
    const userId = await requireUser();
    const result = await syncCartApi(userId, items);
    return { success: true, message: 'Cart synced', data: result };
  } catch (error: unknown) {
    console.error('[syncCart]', error);
    return { success: false, error: 'Failed to sync cart. Please try again.' };
  }
}
