'use server';

import { clerkClient } from '@clerk/nextjs/server';
import { z } from 'zod';
import { getCart } from '@/features/cart/api/cart';
import type { OrderResponse } from '@/features/order/types/order';
import { createCheckout as createCheckoutApi, verifySession } from '@/features/payment/api/payment';
import type { CartItemSnapshot } from '@/features/payment/types/payment';
import { getProduct } from '@/features/product/api/product';
import { requireUser } from '@/features/user/actions/auth';
import { clearCart } from '@/lib/server/actions/carts';
import { createOrder } from '@/lib/server/actions/orders';

const CheckoutSessionSchema = z.object({
  sessionId: z.string().min(1, 'Session ID required'),
});

export async function createCheckoutSession() {
  const userId = await requireUser();

  const cartData = await getCart(userId);
  const cart = cartData.items;

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const customerEmail = user.emailAddresses[0]?.emailAddress || '';

  if (!cart || cart.length === 0) {
    throw new Error('Cart is empty');
  }

  const lineItems = await Promise.all(
    cart.map(async (item) => {
      const product = getProduct(Number(item.productId));
      if (!product) {
        throw new Error(`Product not found: ${item.productId}`);
      }

      return {
        productId: String(item.productId),
        name: product.name || 'Product',
        description: product.summary || '',
        unitAmount: Math.round((item.unitPrice || 0) * 100),
        currency: 'usd',
        quantity: item.quantity,
        image: product.image?.image_url || '',
      };
    }),
  );

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const result = await createCheckoutApi({
    lineItems,
    successUrl: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: `${appUrl}/checkout/cancel`,
    customerEmail,
    metadata: {
      userId,
      cartSnapshot: JSON.stringify(
        cart.map(
          (item) =>
            ({
              productId: item.productId,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              totalPrice: item.totalPrice || item.unitPrice * item.quantity,
            }) satisfies CartItemSnapshot,
        ),
      ),
    },
  });

  return result;
}

export async function verifyCheckoutSession(sessionId: string): Promise<OrderResponse> {
  const userId = await requireUser();

  const parsed = CheckoutSessionSchema.safeParse({ sessionId });
  if (!parsed.success) {
    throw new Error('Invalid session ID');
  }

  const verification = await verifySession(sessionId);
  if (!['complete', 'succeeded'].includes(verification.status)) {
    throw new Error('Payment not completed');
  }

  const metadata = verification.metadata;
  let cartItemsSnapshot: CartItemSnapshot[] = [];

  if (metadata?.cartSnapshot) {
    cartItemsSnapshot = JSON.parse(metadata.cartSnapshot);
  } else {
    const cartData = await getCart(userId);
    cartItemsSnapshot = cartData.items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      totalPrice: item.totalPrice || item.unitPrice * item.quantity,
    }));
  }

  if (!cartItemsSnapshot || cartItemsSnapshot.length === 0) {
    throw new Error('Cart is empty for verification');
  }

  const orderItems = await Promise.all(
    cartItemsSnapshot.map(async (item) => {
      const product = getProduct(Number(item.productId));
      if (!product) {
        throw new Error(`Product not found: ${item.productId}`);
      }

      return {
        product_id: Number(item.productId),
        product_name: product.name || 'Product',
        product_brand: product.brand || '',
        product_description: product.summary || '',
        product_image: product.image?.image_url || '',
        product_unit_price: item.unitPrice,
        product_quantity: item.quantity,
      };
    }),
  );

  const totalPrice = cartItemsSnapshot.reduce((sum, item) => sum + item.totalPrice, 0);

  const orderResponse = await createOrder({
    user_id: userId,
    items: orderItems,
    purchase_date: new Date().toISOString(),
    total_price: totalPrice,
  });

  if (orderResponse.success) {
    await clearCart();
  }

  return orderResponse;
}
