import { getProducts } from '@/lib/api/product';
import SearchClient from './SearchClient';

export default async function SearchPage() {
  const productsResponse = getProducts();
  const products = productsResponse.data || [];

  return <SearchClient initialProducts={products} />;
}
