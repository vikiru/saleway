'use server';

import type {
  CheckoutSessionRequest,
  CheckoutSessionResponse,
  RefundRequest,
  RefundResponse,
} from '@/features/payment/types/payment';
import { createCheckout, processRefund } from '@/features/payment/api/payment';

export async function createCheckoutAction(request: CheckoutSessionRequest): Promise<CheckoutSessionResponse> {
  return createCheckout(request);
}

export async function processRefundAction(request: RefundRequest): Promise<RefundResponse> {
  return processRefund(request);
}
