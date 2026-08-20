import { getProducts } from '@/features/product/api/product';
import { requireUser } from '@/features/user/actions/auth';
import { CartPage } from '@/views/cart/CartPage';

export default async function Cart() {
  await requireUser();
  const products = await getProducts();

  return <CartPage products={products} />;
}
