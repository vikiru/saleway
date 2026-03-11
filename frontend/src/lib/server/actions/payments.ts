'use server';

import { createCheckout, processRefund, verifySession as verifySessionApi } from '@/features/payment/api/payment';
import type {
  CheckoutSessionRequest,
  CheckoutSessionResponse,
  RefundRequest,
  RefundResponse,
  VerifySessionResponse,
} from '@/features/payment/types/payment';
import type { ServiceResponse } from '@/shared/api/types';

export async function createCheckoutAction(
  request: CheckoutSessionRequest,
): Promise<ServiceResponse<CheckoutSessionResponse>> {
  try {
    const result = await createCheckout(request);
    return { success: true, message: 'Checkout session created', data: result };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to create checkout session';
    return { success: false, error: message };
  }
}

export async function processRefundAction(request: RefundRequest): Promise<ServiceResponse<RefundResponse>> {
  try {
    const result = await processRefund(request);
    return { success: true, message: 'Refund processed', data: result };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to process refund';
    return { success: false, error: message };
  }
}

export async function verifySessionAction(sessionId: string): Promise<ServiceResponse<VerifySessionResponse>> {
  try {
    const result = await verifySessionApi(sessionId);
    return { success: true, message: 'Session verified', data: result };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to verify session';
    return { success: false, error: message };
  }
}
