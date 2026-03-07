import { redirect } from 'next/navigation';
import { getProducts } from '@/features/product/api/product';
import { getCurrentUser } from '@/features/user/actions/auth';
import { SIGNIN_ROUTE } from '@/lib/constants/routes';
import { CheckoutPage } from '@/pages/checkout/CheckoutPage';

export default async function Page() {
  const userId = await getCurrentUser();
  if (!userId) {
    redirect(SIGNIN_ROUTE);
  }

  const products = await getProducts();

  return <CheckoutPage products={products} />;
}
