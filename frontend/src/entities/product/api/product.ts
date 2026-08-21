import type { Product } from '@/entities/product/types/product';

import { getProduct as getStaticProduct, getProducts as getStaticProducts } from '@/shared/api/static';

export async function getProducts(_signal?: AbortSignal): Promise<Product[]> {
  return getStaticProducts();
}

export async function getProduct(productId: number | string, _signal?: AbortSignal): Promise<Product> {
  const product = getStaticProduct(productId);
  if (!product) {
    throw new Error('Product not found');
  }
  return product;
}

export async function getProductsByCategory(category: string, _signal?: AbortSignal): Promise<Product[]> {
  const products = getStaticProducts();
  return products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
}

export async function getProductsByBrand(brand: string, _signal?: AbortSignal): Promise<Product[]> {
  const products = getStaticProducts();
  return products.filter((p) => p.brand.toLowerCase() === brand.toLowerCase());
}

export async function searchProductsByName(name: string, _signal?: AbortSignal): Promise<Product[]> {
  const products = getStaticProducts();
  const query = name.toLowerCase();
  return products.filter((p) => p.name.toLowerCase().includes(query) || p.brand.toLowerCase().includes(query));
}
