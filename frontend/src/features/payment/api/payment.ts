import type {
  CheckoutSessionRequest,
  CheckoutSessionResponse,
  RefundRequest,
  RefundResponse,
  VerifySessionResponse,
} from '@/features/payment/types/payment';
import { PAYMENT_SERVICE_URL } from '@/lib/constants/routes';
import { handleResponse } from '@/shared/api/fetch';
import type { ServiceResponse } from '@/shared/api/types';

export async function createCheckout(request: CheckoutSessionRequest): Promise<CheckoutSessionResponse> {
  const response = await fetch(`${PAYMENT_SERVICE_URL}/checkout/create-session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });
  const result = await handleResponse<ServiceResponse<CheckoutSessionResponse>>(response);
  if (!result.success) {
    throw new Error(result.error || 'Checkout failed');
  }
  return result.data;
}

export async function verifySession(sessionId: string, signal?: AbortSignal): Promise<VerifySessionResponse> {
  const response = await fetch(`${PAYMENT_SERVICE_URL}/checkout/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId }),
    signal,
  });
  const result = await handleResponse<ServiceResponse<VerifySessionResponse>>(response);
  if (!result.success) {
    throw new Error(result.error || 'Verification failed');
  }
  return result.data;
}

export async function processRefund(request: RefundRequest): Promise<RefundResponse> {
  const response = await fetch(`${PAYMENT_SERVICE_URL}/refund/process`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });
  const result = await handleResponse<ServiceResponse<RefundResponse>>(response);
  if (!result.success) {
    throw new Error(result.error || 'Refund failed');
  }
  return result.data;
}
