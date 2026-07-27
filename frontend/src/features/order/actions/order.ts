import {
  createOrder as createOrderApi,
  deleteOrder as deleteOrderApi,
  getOrder as getOrderApi,
  getOrderByStripeSession as getOrderByStripeSessionApi,
  getOrders as getOrdersApi,
  updateOrderStatus as updateOrderStatusApi,
} from '@/features/order/api/order';
import type { Order, OrderCreate, OrderResponse } from '@/features/order/types/order';
import type { ServiceResponse } from '@/shared/api/types';

export async function getOrderAction(orderId: number | string): Promise<Order> {
  return getOrderApi(orderId);
}

export async function getOrdersAction(userId: string): Promise<Order[]> {
  return getOrdersApi(userId);
}

export async function getOrderByStripeSessionAction(sessionId: string): Promise<Order> {
  return getOrderByStripeSessionApi(sessionId);
}

export async function createOrder(data: OrderCreate): Promise<OrderResponse> {
  try {
    const result = await createOrderApi(data);
    return { success: true, message: 'Order created successfully', data: result };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to create order';
    return { success: false, error: message };
  }
}

export async function updateOrderStatusAction(orderId: number, status: string): Promise<OrderResponse> {
  try {
    const result = await updateOrderStatusApi(orderId, status);
    return { success: true, message: 'Order status updated', data: result };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to update order status';
    return { success: false, error: message };
  }
}

export async function deleteOrderAction(orderId: number): Promise<ServiceResponse<void>> {
  try {
    await deleteOrderApi(orderId);
    return { success: true, message: 'Order deleted successfully', data: undefined };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to delete order';
    return { success: false, error: message };
  }
}
