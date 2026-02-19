import { ORDER_SERVICE_URL } from '@/lib/routes';
import type { OrderCreate, OrderResponse, OrdersResponse } from '@/lib/types/order';
import { handleResponse } from './fetch';

export async function fetchUserOrders(userId: string, signal?: AbortSignal): Promise<OrdersResponse> {
  const response = await fetch(`${ORDER_SERVICE_URL}/orders/user/${userId}`, { signal });
  return handleResponse(response);
}

export async function fetchOrder(orderId: number, signal?: AbortSignal): Promise<OrderResponse> {
  const response = await fetch(`${ORDER_SERVICE_URL}/orders/${orderId}`, { signal });
  return handleResponse(response);
}

export async function createOrder(order: OrderCreate): Promise<OrderResponse> {
  const response = await fetch(`${ORDER_SERVICE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order),
  });
  return handleResponse(response);
}

export async function cancelOrder(orderId: number): Promise<OrderResponse> {
  const response = await fetch(`${ORDER_SERVICE_URL}/orders/${orderId}/cancel`, {
    method: 'POST',
  });
  return handleResponse(response);
}
