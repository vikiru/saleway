'use server';

import { handleResponse } from '@/lib/api/fetch';
import { ORDER_SERVICE_URL } from '@/lib/routes';
import type { OrderCreate, OrderResponse } from '@/lib/types/order';

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
