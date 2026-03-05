'use server';

import { auth, clerkClient } from '@clerk/nextjs/server';
import { z } from 'zod';
import { createCheckout as createCheckoutApi, verifySession } from '@/lib/api/payment';
import { getProduct } from '@/lib/api/product';
import { createOrder } from '@/lib/server/actions/orders';
import { useCartStore } from '@/lib/stores/Cart';
import type { OrderResponse } from '@/lib/types/order';

export const CheckoutSessionSchema = z.object({
  sessionId: z.string().min(1, 'Session ID required'),
});

export async function createCheckoutSession() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error('Must be authenticated to checkout');
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const customerEmail = user.emailAddresses[0]?.emailAddress || '';

  const cart = useCartStore.getState().items;
  if (cart.length === 0) {
    throw new Error('Cart is empty');
  }

  const lineItems = await Promise.all(
    cart.map(async (item) => {
      const productResponse = getProduct(Number(item.productId));
      const product = productResponse.data;

      return {
        name: product?.name || 'Product',
        description: product?.summary || '',
        unitAmount: Math.round((item.unitPrice || 0) * 100),
        currency: 'usd',
        quantity: item.quantity,
        image: product?.image?.image_url || '',
      };
    }),
  );

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const result = await createCheckoutApi({
    lineItems,
    successUrl: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: `${appUrl}/checkout/cancel`,
    customerEmail,
    metadata: { userId },
  });

  return result;
}

export async function verifyCheckoutSession(sessionId: string) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error('Must be authenticated');
  }

  const parsed = CheckoutSessionSchema.safeParse({ sessionId });
  if (!parsed.success) {
    throw new Error('Invalid session ID');
  }

  const verification = await verifySession(sessionId);

  if (verification.status !== 'complete') {
    throw new Error('Payment not completed');
  }

  const cart = useCartStore.getState().items;

  const orderItems = await Promise.all(
    cart.map(async (item) => {
      const productResponse = getProduct(Number(item.productId));
      const product = productResponse.data;

      return {
        productId: Number(item.productId),
        productName: product?.name || 'Product',
        productBrand: product?.brand || '',
        productDescription: product?.summary || '',
        productImage: product?.image?.image_url || '',
        productUnitPrice: item.unitPrice,
        productQuantity: item.quantity,
      };
    }),
  );

  const totalPrice = cart.reduce((sum, item) => sum + (item.totalPrice || item.unitPrice * item.quantity), 0);

  let order: OrderResponse;
  try {
    order = await createOrder({
      userId,
      items: orderItems,
      purchaseDate: new Date().toISOString(),
      totalPrice,
    });
  } catch (err) {
    console.error('Failed to create order after payment:', err);
    throw new Error('Payment successful but failed to create order. Please contact support.');
  }

  useCartStore.getState().clearCart();

  return order;
}
