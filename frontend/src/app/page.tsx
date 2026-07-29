import { getProducts } from '@/features/product/api/product';
import { HomePage } from '@/views/home/HomePage';

export default async function Home() {
  const products = await getProducts();
  return <HomePage products={products} />;
}
