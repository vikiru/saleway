import { getProduct as getStaticProduct, getProducts as getStaticProducts } from '@/lib/api/static';
import type { ProductResponse, ProductSearchResponse, ProductsResponse } from '@/lib/types/product';

export function getProducts(): ProductsResponse {
  return getStaticProducts();
}

export function getProduct(productId: number | string): ProductResponse {
  return getStaticProduct(productId);
}

export function searchProducts(
  query: string,
  category?: string,
  brand?: string,
  page = 1,
  pageSize = 10,
): ProductSearchResponse {
  let products = getStaticProducts().data ?? [];

  if (query) {
    const q = query.toLowerCase();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q),
    );
  }

  if (category) {
    products = products.filter((p) => p.category === category);
  }

  if (brand) {
    products = products.filter((p) => p.brand.toLowerCase() === brand.toLowerCase());
  }

  const start = (page - 1) * pageSize;
  const paginatedProducts = products.slice(start, start + pageSize);

  return {
    success: true,
    data: {
      products: paginatedProducts,
      total: products.length,
      page,
      pageSize,
    },
  };
}
