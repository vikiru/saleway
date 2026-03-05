import type { OrderResponse, OrdersResponse } from '@/features/order/types/order';
import { ORDER_SERVICE_URL } from '@/lib/routes';
import { handleResponse } from '@/shared/api/fetch';

export async function getOrders(userId: string, signal?: AbortSignal): Promise<OrdersResponse> {
  const response = await fetch(`${ORDER_SERVICE_URL}/orders/user/${userId}`, { signal });
  return handleResponse(response);
}

export async function getOrder(orderId: number | string, signal?: AbortSignal): Promise<OrderResponse> {
  const response = await fetch(`${ORDER_SERVICE_URL}/orders/${orderId}`, { signal });
  return handleResponse(response);
}
