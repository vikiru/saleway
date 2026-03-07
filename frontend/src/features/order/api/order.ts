import type { Order } from '@/features/order/types/order';
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
