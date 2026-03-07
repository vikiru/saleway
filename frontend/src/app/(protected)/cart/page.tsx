import { getProducts } from '@/features/product/api/product';
import { requireUser } from '@/features/user/actions/auth';
import { CartPage } from '@/pages/cart/CartPage';

export default async function Cart() {
  const userId = await requireUser();
  const products = await getProducts();

  return <CartPage products={products} />;
}
