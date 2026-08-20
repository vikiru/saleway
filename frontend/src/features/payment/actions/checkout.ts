'use server';

import { clerkClient } from '@clerk/nextjs/server';
import { z } from 'zod';

import type { OrderResponse } from '@/features/order/types/order';
import type { CartItemSnapshot } from '@/features/payment/types/payment';

import { clearCart } from '@/features/cart/actions/cart';
import { getCart } from '@/features/cart/api/cart';
import { createOrder } from '@/features/order/actions/order';
import { createCheckout as createCheckoutApi, verifySession } from '@/features/payment/api/payment';
import { getProduct } from '@/features/product/api/product';
import { requireUser } from '@/features/user/actions/auth';

const CheckoutSessionSchema = z.object({
  sessionId: z.string().min(1, 'Session ID required'),
});

export async function createCheckoutSession() {
  try {
    const userId = await requireUser();

    const cartData = await getCart(userId);
    const cart = cartData.items;

    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const customerEmail = user.emailAddresses[0]?.emailAddress || '';

    if (!cart || cart.length === 0) {
      return { success: false, error: 'Your cart is empty.' };
    }

    const enrichedItems = await Promise.all(
      cart.map(async (item) => {
        const product = await getProduct(Number(item.productId));
        if (!product) {
          throw new Error(`Product not found: ${item.productId}`);
        }

        const snapshotItem: CartItemSnapshot = {
          productId: item.productId,
          quantity: Number(item.quantity),
          unitPrice: Number(product.price),
          totalPrice: Number(product.price) * Number(item.quantity),
        };

        const lineItem = {
          productId: String(item.productId),
          name: product.name || 'Product',
          description: product.summary || '',
          unitAmount: Math.round((product.price || 0) * 100),
          currency: 'usd',
          quantity: item.quantity,
          image: product.image?.image_url || '',
        };

        return { lineItem, snapshotItem };
      }),
    );

    const lineItems = enrichedItems.map((e) => e.lineItem);
    const cartSnapshotData = enrichedItems.map((e) => e.snapshotItem);

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const result = await createCheckoutApi({
      lineItems,
      successUrl: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${appUrl}/checkout/cancel`,
      customerEmail,
      metadata: {
        userId,
        cartSnapshot: JSON.stringify(cartSnapshotData),
      },
    });

    return { success: true, data: result };
  } catch (error) {
    console.error('[createCheckoutSession]', error);
    return { success: false, error: 'Failed to create checkout session. Please try again.' };
  }
}

export async function verifyCheckoutSession(sessionId: string): Promise<OrderResponse> {
  try {
    const userId = await requireUser();

    const parsed = CheckoutSessionSchema.safeParse({ sessionId });
    if (!parsed.success) {
      return { success: false, error: 'Invalid session ID' };
    }

    const verification = await verifySession(sessionId);
    if (!['complete', 'succeeded'].includes(verification.status)) {
      return { success: false, error: 'Payment not completed' };
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
      return { success: false, error: 'No items found for order confirmation' };
    }

    const orderItems = await Promise.all(
      cartItemsSnapshot.map(async (item) => {
        const product = await getProduct(Number(item.productId));
        if (!product) {
          throw new Error(`Product not found: ${item.productId}`);
        }

        return {
          product_id: Number(item.productId),
          product_name: product.name || 'Product',
          product_brand: product.brand || '',
          product_description: product.summary || '',
          product_image: product.image?.image_url || '',
          product_unit_price: product.price,
          product_quantity: item.quantity,
        };
      }),
    );

    const totalPrice = cartItemsSnapshot.reduce((sum, item) => sum + Number(item.totalPrice), 0);

    const orderResult = await createOrder({
      user_id: userId,
      items: orderItems,
      purchase_date: new Date().toISOString(),
      total_price: totalPrice,
      stripe_session_id: sessionId,
    });

    if (!orderResult.success) {
      return { success: false, error: orderResult.error };
    }

    await clearCart();
    return { success: true, message: 'Order created successfully', data: orderResult.data };
  } catch (error) {
    console.error('[verifyCheckoutSession]', error);
    return { success: false, error: 'Failed to verify payment. Please contact support.' };
  }
}
