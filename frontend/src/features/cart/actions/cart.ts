import {
  clearCart as clearCartApi,
  createCart as createCartApi,
  createCartItem as createCartItemApi,
  getCart as getCartApi,
  removeCartItem as removeCartItemApi,
  syncCart as syncCartApi,
  updateCartItem as updateCartItemApi,
} from '@/features/cart/api/cart';
import type { Cart, CartItemCreateInput, CartItemResponse, CartResponse } from '@/features/cart/types/cart';
import { requireUser } from '@/features/user/actions/auth';
import type { ServiceResponse } from '@/shared/api/types';

export async function getCartAction(userId: string): Promise<Cart> {
  return getCartApi(userId);
}

export async function createCartAction(): Promise<CartResponse> {
  try {
    const userId = await requireUser();
    const result = await createCartApi(userId);
    return { success: true, message: 'Cart created', data: result };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to create cart';
    return { success: false, error: message };
  }
}

export async function createCartItemAction(userId: string, item: CartItemCreateInput): Promise<CartItemResponse> {
  try {
    const result = await createCartItemApi(userId, item);
    return { success: true, message: 'Item added to cart', data: result };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to add item to cart';
    return { success: false, error: message };
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
    const message = error instanceof Error ? error.message : 'Failed to update cart';
    return { success: false, error: message };
  }
}

export async function removeCartItemAction(userId: string, cartItemId: string): Promise<ServiceResponse<void>> {
  try {
    await removeCartItemApi(userId, cartItemId);
    return { success: true, message: 'Item removed from cart', data: undefined };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to remove item';
    return { success: false, error: message };
  }
}

export async function clearCart(): Promise<ServiceResponse<void>> {
  try {
    const userId = await requireUser();
    await clearCartApi(userId);
    return { success: true, message: 'Cart cleared', data: undefined };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to clear cart';
    return { success: false, error: message };
  }
}

export async function syncCart(items: CartItemCreateInput[]): Promise<CartResponse> {
  try {
    const userId = await requireUser();
    const result = await syncCartApi(userId, items);
    return { success: true, message: 'Cart synced', data: result };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to sync cart';
    return { success: false, error: message };
  }
}
