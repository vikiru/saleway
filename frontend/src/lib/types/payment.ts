export interface PaymentCartItem {
  name: string;
  description: string;
  unitAmount: number;
  currency: string;
  quantity: number;
  image: string;
}

export interface CheckoutSessionRequest {
  lineItems: PaymentCartItem[];
  successUrl: string;
  cancelUrl: string;
  customerEmail: string;
  metadata?: Record<string, string>;
}

export interface CheckoutSessionResponse {
  sessionId: string;
  url: string;
}

export interface RefundRequest {
  paymentIntentId: string;
  amount: number;
  reason: string;
}

export interface RefundResponse {
  refundId: string;
  paymentIntentId: string;
  amount: number;
  status: string;
  reason: string;
}

export interface VerifySessionRequest {
  sessionId: string;
}

export interface VerifySessionResponse {
  sessionId: string;
  paymentIntentId: string;
  amount: number;
  currency: string;
  status: string;
}
