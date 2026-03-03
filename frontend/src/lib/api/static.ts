import productsData from '@/data/products.json';
import type { Product, ProductResponse, ProductsResponse } from '@/lib/types/product';

export function getProducts(): ProductsResponse {
  return {
    success: true,
    data: productsData.data as Product[],
  };
}

export function getProduct(productId: number | string): ProductResponse {
  const id = typeof productId === 'string' ? parseInt(productId, 10) : productId;
  const product = productsData.data?.find((p) => p.id === id);

  if (!product) {
    return {
      success: false,
      error: 'Product not found',
    };
  }

  return {
    success: true,
    data: product as Product,
  };
}
