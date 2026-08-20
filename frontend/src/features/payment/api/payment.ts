import type {
  CheckoutSessionRequest,
  CheckoutSessionResponse,
  RefundRequest,
  RefundResponse,
  VerifySessionResponse,
} from '@/features/payment/types/payment';

import {
  checkoutSessionRequestSchema,
  checkoutSessionResponseSchema,
  refundResponseSchema,
  verifySessionResponseSchema,
} from '@/features/payment/schemas/payment';
import { PAYMENT_SERVICE_URL } from '@/lib/constants/routes';
import { handleResponse } from '@/shared/api/fetch';

export async function createCheckout(request: CheckoutSessionRequest): Promise<CheckoutSessionResponse> {
  const inputParsed = checkoutSessionRequestSchema.safeParse(request);
  if (!inputParsed.success) {
    throw new Error('Invalid checkout session request payload');
  }
  const response = await fetch(`${PAYMENT_SERVICE_URL}/checkout/create-session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inputParsed.data),
  });
  const data = await handleResponse<CheckoutSessionResponse>(response);
  const parsed = checkoutSessionResponseSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error('Invalid checkout session response format');
  }
  return parsed.data as CheckoutSessionResponse;
}

export async function verifySession(sessionId: string, signal?: AbortSignal): Promise<VerifySessionResponse> {
  const response = await fetch(`${PAYMENT_SERVICE_URL}/checkout/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId }),
    signal,
  });
  const data = await handleResponse<VerifySessionResponse>(response);
  const parsed = verifySessionResponseSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error('Invalid verify session response format');
  }
  return parsed.data as VerifySessionResponse;
}

export async function processRefund(request: RefundRequest): Promise<RefundResponse> {
  const response = await fetch(`${PAYMENT_SERVICE_URL}/refund/process`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });
  const data = await handleResponse<RefundResponse>(response);
  const parsed = refundResponseSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error('Invalid refund response format');
  }
  return parsed.data as RefundResponse;
}
