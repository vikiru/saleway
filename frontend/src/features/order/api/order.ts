import type { Order, OrderCreate } from '@/features/order/types/order';
import { ORDER_SERVICE_URL } from '@/lib/constants/routes';
import { handleResponse } from '@/shared/api/fetch';

export async function getOrders(userId: string, signal?: AbortSignal): Promise<Order[]> {
  const response = await fetch(`${ORDER_SERVICE_URL}/orders/user/${userId}`, { signal });
  return handleResponse(response);
}

export async function getOrder(orderId: number | string, signal?: AbortSignal): Promise<Order> {
  const response = await fetch(`${ORDER_SERVICE_URL}/orders/${orderId}`, { signal });
  return handleResponse(response);
}

export async function getOrderByStripeSession(sessionId: string, signal?: AbortSignal): Promise<Order> {
  const response = await fetch(`${ORDER_SERVICE_URL}/orders/stripe-session/${sessionId}`, { signal });
  return handleResponse<Order>(response);
}

export async function createOrder(data: OrderCreate): Promise<Order> {
  const response = await fetch(`${ORDER_SERVICE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse<Order>(response);
}

export async function updateOrderStatus(orderId: number, status: string): Promise<Order> {
  const response = await fetch(`${ORDER_SERVICE_URL}/orders/${orderId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  return handleResponse<Order>(response);
}

export async function deleteOrder(orderId: number): Promise<void> {
  const response = await fetch(`${ORDER_SERVICE_URL}/orders/${orderId}`, {
    method: 'DELETE',
  });
  return handleResponse<void>(response);
}
