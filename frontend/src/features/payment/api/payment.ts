import type {
  CheckoutSessionRequest,
  CheckoutSessionResponse,
  RefundRequest,
  RefundResponse,
  VerifySessionResponse,
} from '@/features/payment/types/payment';
import { PAYMENT_SERVICE_URL } from '@/lib/constants/routes';
import { handleResponse } from '@/shared/api/fetch';

export async function createCheckout(request: CheckoutSessionRequest): Promise<CheckoutSessionResponse> {
  const response = await fetch(`${PAYMENT_SERVICE_URL}/checkout/create-session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });
  return handleResponse<CheckoutSessionResponse>(response);
}

export async function verifySession(sessionId: string, signal?: AbortSignal): Promise<VerifySessionResponse> {
  const response = await fetch(`${PAYMENT_SERVICE_URL}/checkout/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId }),
    signal,
  });
  return handleResponse<VerifySessionResponse>(response);
}

export async function processRefund(request: RefundRequest): Promise<RefundResponse> {
  const response = await fetch(`${PAYMENT_SERVICE_URL}/refund/process`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });
  return handleResponse<RefundResponse>(response);
}
