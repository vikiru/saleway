import { useQuery } from '@tanstack/react-query';
import { fetchProduct, fetchProducts, searchProducts } from '@/lib/api/product';
import { productQueryKey, productsQueryKey } from '@/lib/queries/keys';

export function useProducts() {
  return useQuery({
    queryKey: productsQueryKey(),
    queryFn: ({ signal }) => fetchProducts(signal),
  });
}

export function useProduct(productId: number) {
  return useQuery({
    queryKey: productQueryKey(String(productId)),
    queryFn: ({ signal }) => fetchProduct(productId, signal),
    enabled: !!productId,
  });
}

export function useProductSearch(query: string, category?: string, brand?: string, page = 1, pageSize = 10) {
  return useQuery({
    queryKey: productsQueryKey({ query, category, brand, page, pageSize }),
    queryFn: ({ signal }) => searchProducts(query, category, brand, page, pageSize, signal),
    enabled: query.length > 0,
  });
}
