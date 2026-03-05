import { getProducts } from '@/features/product/api/product';
import { SearchPage } from '@/pages/search/ui/SearchPage';

export default async function Page() {
  const productsResponse = await getProducts();
  const initialProducts = productsResponse?.data || [];

  return <SearchPage initialProducts={initialProducts} />;
}
