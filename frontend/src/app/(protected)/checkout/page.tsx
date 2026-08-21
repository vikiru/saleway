import { redirect } from 'next/navigation';

import { getProducts } from '@/entities/product/api/product';
import { createCheckoutSession } from '@/features/checkout/actions/checkout';
import { getCurrentUser } from '@/features/user/actions/auth';
import { SIGNIN_ROUTE } from '@/shared/config/routes';
import { CheckoutPage } from '@/views/checkout/CheckoutPage';

export default async function Page() {
  const userId = await getCurrentUser();
  if (!userId) {
    redirect(SIGNIN_ROUTE);
  }

  const products = await getProducts();

  return <CheckoutPage onCheckout={createCheckoutSession} products={products} />;
}
