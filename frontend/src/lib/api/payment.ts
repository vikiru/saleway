import { handleResponse } from '@/lib/api/fetch';
import { PAYMENT_SERVICE_URL } from '@/lib/routes';
import type {
  CheckoutSessionRequest,
  CheckoutSessionResponse,
  RefundRequest,
  RefundResponse,
  VerifySessionResponse,
} from '@/lib/types/payment';

export async function createCheckout(request: CheckoutSessionRequest): Promise<CheckoutSessionResponse> {
  const response = await fetch(`${PAYMENT_SERVICE_URL}/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });
  return handleResponse(response);
}

export async function verifySession(sessionId: string, signal?: AbortSignal): Promise<VerifySessionResponse> {
  const response = await fetch(`${PAYMENT_SERVICE_URL}/verify/${sessionId}`, { signal });
  return handleResponse(response);
}

export async function processRefund(request: RefundRequest): Promise<RefundResponse> {
  const response = await fetch(`${PAYMENT_SERVICE_URL}/refund`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });
  return handleResponse(response);
}
