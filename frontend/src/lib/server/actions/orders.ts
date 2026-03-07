'use server';

import type { OrderCreate, OrderResponse } from '@/features/order/types/order';
import { requireUser } from '@/features/user/actions/auth';
import { ORDER_SERVICE_URL } from '@/lib/constants/routes';
import { handleResponse } from '@/shared/api/fetch';

export async function createOrder(order: OrderCreate): Promise<OrderResponse> {
  const userId = await requireUser();

  const response = await fetch(`${ORDER_SERVICE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...order, user_id: userId }),
  });
  return handleResponse(response);
}

export async function cancelOrder(orderId: number): Promise<OrderResponse> {
  const response = await fetch(`${ORDER_SERVICE_URL}/orders/${orderId}/cancel`, {
    method: 'POST',
  });
  return handleResponse(response);
}
