import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/features/user/actions/auth';
import { SIGNIN_ROUTE } from '@/lib/constants/routes';
import { CartPage } from '@/pages/cart/ui/CartPage';
import { getProducts } from '@/features/product/api/product';

export default async function Cart() {
  const userId = await getCurrentUser();
  if (!userId) {
    redirect(SIGNIN_ROUTE);
  }

  const productsResponse = await getProducts();
  const products = productsResponse.data || [];

  return <CartPage products={products} />;
}
