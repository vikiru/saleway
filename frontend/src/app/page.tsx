import { getProducts } from '@/features/product/api/product';
import { HomePage } from '@/pages/home/HomePage';

export default async function Home() {
  const products = await getProducts();
  return <HomePage products={products} />;
}
