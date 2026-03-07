import { searchProducts } from '@/features/product/api/product';
import { SearchPage } from '@/pages/search/SearchPage';

interface ProductSearchProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    brand?: string;
    minPrice?: string;
    maxPrice?: string;
    sortBy?: string;
    page?: string;
  }>;
}

export default async function Search({ searchParams }: ProductSearchProps) {
  const params = await searchParams;
  const query = params.q || '';
  const category = params.category || undefined;
  const brand = params.brand || undefined;
  const page = params.page ? parseInt(params.page, 10) : 1;
  const sortBy = params.sortBy || 'price-asc';
  const minPrice = params.minPrice ? parseFloat(params.minPrice) : undefined;
  const maxPrice = params.maxPrice ? parseFloat(params.maxPrice) : undefined;

  const productsResponse = await searchProducts(query, category, brand, page, 9, minPrice, maxPrice, sortBy);

  return (
    <SearchPage products={productsResponse.products} searchParams={params} totalProducts={productsResponse.total} />
  );
}
