'use server';

import type {
  CheckoutSessionRequest,
  CheckoutSessionResponse,
  RefundRequest,
  RefundResponse,
  VerifySessionResponse,
} from '@/entities/payment/types/payment';
import type { ServiceResponse } from '@/shared/api/types';

import { createCheckout, processRefund, verifySession as verifySessionApi } from '@/entities/payment/api/payment';

export async function createCheckoutAction(
  request: CheckoutSessionRequest,
): Promise<ServiceResponse<CheckoutSessionResponse>> {
  try {
    const result = await createCheckout(request);
    return { success: true, message: 'Checkout session created', data: result };
  } catch (error: unknown) {
    console.error('[createCheckoutAction]', error);
    return { success: false, error: 'Failed to create checkout session. Please try again.' };
  }
}

export async function processRefundAction(request: RefundRequest): Promise<ServiceResponse<RefundResponse>> {
  try {
    const result = await processRefund(request);
    return { success: true, message: 'Refund processed', data: result };
  } catch (error: unknown) {
    console.error('[processRefundAction]', error);
    return { success: false, error: 'Failed to process refund. Please contact support.' };
  }
}

export async function verifySessionAction(sessionId: string): Promise<ServiceResponse<VerifySessionResponse>> {
  try {
    const result = await verifySessionApi(sessionId);
    return { success: true, message: 'Session verified', data: result };
  } catch (error: unknown) {
    console.error('[verifySessionAction]', error);
    return { success: false, error: 'Failed to verify session. Please try again.' };
  }
}
