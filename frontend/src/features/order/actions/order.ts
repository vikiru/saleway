'use server';

import type { Order, OrderCreate, OrderResponse } from '@/entities/order/types/order';
import type { ServiceResponse } from '@/shared/api/types';

import {
  createOrder as createOrderApi,
  deleteOrder as deleteOrderApi,
  getOrder as getOrderApi,
  getOrderByStripeSession as getOrderByStripeSessionApi,
  getOrders as getOrdersApi,
  updateOrderStatus as updateOrderStatusApi,
} from '@/entities/order/api/order';
import { requireUser } from '@/features/user/actions/auth';

export async function getOrderAction(orderId: number | string): Promise<Order> {
  const userId = await requireUser();
  const order = await getOrderApi(orderId);
  if (order.user_id !== userId) {
    throw new Error('Unauthorized access to order');
  }
  return order;
}

export async function getOrdersAction(): Promise<Order[]> {
  const userId = await requireUser();
  return getOrdersApi(userId);
}

export async function getOrderByStripeSessionAction(sessionId: string): Promise<Order> {
  return getOrderByStripeSessionApi(sessionId);
}

export async function createOrder(data: OrderCreate): Promise<OrderResponse> {
  const userId = await requireUser();
  const payload = { ...data, user_id: userId };
  try {
    const result = await createOrderApi(payload);
    return { success: true, message: 'Order created successfully', data: result };
  } catch (error: unknown) {
    console.error('[createOrder]', error);
    return { success: false, error: 'Failed to create order. Please try again.' };
  }
}

export async function updateOrderStatusAction(orderId: number, status: string): Promise<OrderResponse> {
  const userId = await requireUser();
  const order = await getOrderApi(orderId);
  if (order.user_id !== userId) {
    return { success: false, error: 'Unauthorized' };
  }
  try {
    const result = await updateOrderStatusApi(orderId, status);
    return { success: true, message: 'Order status updated', data: result };
  } catch (error: unknown) {
    console.error('[updateOrderStatusAction]', error);
    return { success: false, error: 'Failed to update order status. Please try again.' };
  }
}

export async function deleteOrderAction(orderId: number): Promise<ServiceResponse<void>> {
  const userId = await requireUser();
  const order = await getOrderApi(orderId);
  if (order.user_id !== userId) {
    return { success: false, error: 'Unauthorized' };
  }
  try {
    await deleteOrderApi(orderId);
    return { success: true, message: 'Order deleted successfully', data: undefined };
  } catch (error: unknown) {
    console.error('[deleteOrderAction]', error);
    return { success: false, error: 'Failed to delete order. Please try again.' };
  }
}
