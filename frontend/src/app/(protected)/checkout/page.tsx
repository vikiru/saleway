import { redirect } from 'next/navigation';
import { createCheckoutSession } from '@/features/payment/actions/checkout';
import { getProducts } from '@/features/product/api/product';
import { getCurrentUser } from '@/features/user/actions/auth';
import { SIGNIN_ROUTE } from '@/lib/constants/routes';
import { CheckoutPage } from '@/views/checkout/CheckoutPage';

export default async function Page() {
  const userId = await getCurrentUser();
  if (!userId) {
    redirect(SIGNIN_ROUTE);
  }

  const products = await getProducts();

  return <CheckoutPage onCheckout={createCheckoutSession} products={products} />;
}
