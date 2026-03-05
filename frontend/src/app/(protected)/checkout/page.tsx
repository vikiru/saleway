import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/features/user/actions/auth';
import { SIGNIN_ROUTE } from '@/lib/constants/routes';
import { CheckoutPage } from '@/pages/checkout/ui/CheckoutPage';
import { getProducts } from '@/features/product/api/product';

export default async function Page() {
  const userId = await getCurrentUser();
  if (!userId) {
    redirect(SIGNIN_ROUTE);
  }

  const productsResponse = await getProducts();
  const products = productsResponse.data || [];

  return <CheckoutPage products={products} />;
}
