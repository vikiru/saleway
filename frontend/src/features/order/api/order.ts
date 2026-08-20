import { z } from 'zod';

import type { Order, OrderCreate } from '@/features/order/types/order';

import { orderCreateSchema, orderReadSchema } from '@/features/order/schemas/order';
import { ORDER_SERVICE_URL } from '@/lib/constants/routes';
import { handleResponse } from '@/shared/api/fetch';

export async function getOrders(userId: string, signal?: AbortSignal): Promise<Order[]> {
  const response = await fetch(`${ORDER_SERVICE_URL}/orders/user/${userId}`, { signal });
  const data = await handleResponse(response);
  const parsed = z.array(orderReadSchema).safeParse(data);
  if (!parsed.success) {
    throw new Error('Invalid orders response format');
  }
  return parsed.data as unknown as Order[];
}

export async function getOrder(orderId: number | string, signal?: AbortSignal): Promise<Order> {
  const response = await fetch(`${ORDER_SERVICE_URL}/orders/${orderId}`, { signal });
  const data = await handleResponse(response);
  const parsed = orderReadSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error('Invalid order response format');
  }
  return parsed.data as unknown as Order;
}

export async function getOrderByStripeSession(sessionId: string, signal?: AbortSignal): Promise<Order> {
  const response = await fetch(`${ORDER_SERVICE_URL}/orders/stripe-session/${sessionId}`, { signal });
  const data = await handleResponse(response);
  const parsed = orderReadSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error('Invalid order response format');
  }
  return parsed.data as unknown as Order;
}

export async function createOrder(data: OrderCreate): Promise<Order> {
  const inputParsed = orderCreateSchema.safeParse(data);
  if (!inputParsed.success) {
    throw new Error('Invalid order creation payload');
  }
  const response = await fetch(`${ORDER_SERVICE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inputParsed.data),
  });
  const responseData = await handleResponse(response);
  const parsed = orderReadSchema.safeParse(responseData);
  if (!parsed.success) {
    throw new Error('Invalid order response format');
  }
  return parsed.data as unknown as Order;
}

export async function updateOrderStatus(orderId: number, status: string): Promise<Order> {
  const response = await fetch(`${ORDER_SERVICE_URL}/orders/${orderId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  const data = await handleResponse(response);
  const parsed = orderReadSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error('Invalid order response format');
  }
  return parsed.data as unknown as Order;
}

export async function deleteOrder(orderId: number): Promise<void> {
  const response = await fetch(`${ORDER_SERVICE_URL}/orders/${orderId}`, {
    method: 'DELETE',
  });
  await handleResponse<void>(response);
}
