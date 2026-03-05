import type { ProductResponse, ProductSearchResponse, ProductsResponse } from '@/features/product/types/product';
import { getProduct as getStaticProduct, getProducts as getStaticProducts } from '@/shared/api/static';

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
  minPrice?: number,
  maxPrice?: number,
  sortBy?: string,
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

  if (minPrice !== undefined) {
    products = products.filter((p) => p.price >= minPrice);
  }

  if (maxPrice !== undefined) {
    products = products.filter((p) => p.price <= maxPrice);
  }

  if (sortBy) {
    products = [...products].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
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
