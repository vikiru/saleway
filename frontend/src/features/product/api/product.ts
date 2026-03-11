import type { Product } from '@/features/product/types/product';
import { PRODUCT_SERVICE_URL } from '@/lib/constants/routes';
import { handleResponse } from '@/shared/api/fetch';

export async function getProducts(signal?: AbortSignal): Promise<Product[]> {
  const response = await fetch(`${PRODUCT_SERVICE_URL}/products`, { signal });
  return handleResponse<Product[]>(response);
}

export async function getProduct(productId: number | string, signal?: AbortSignal): Promise<Product> {
  const response = await fetch(`${PRODUCT_SERVICE_URL}/products/${productId}`, { signal });
  return handleResponse<Product>(response);
}

export async function getProductsByCategory(category: string, signal?: AbortSignal): Promise<Product[]> {
  const response = await fetch(`${PRODUCT_SERVICE_URL}/products/category/${encodeURIComponent(category)}`, { signal });
  return handleResponse<Product[]>(response);
}

export async function getProductsByBrand(brand: string, signal?: AbortSignal): Promise<Product[]> {
  const response = await fetch(`${PRODUCT_SERVICE_URL}/products/brand/${encodeURIComponent(brand)}`, { signal });
  return handleResponse<Product[]>(response);
}

export async function searchProductsByName(name: string, signal?: AbortSignal): Promise<Product[]> {
  const response = await fetch(`${PRODUCT_SERVICE_URL}/products/search/${encodeURIComponent(name)}`, { signal });
  return handleResponse<Product[]>(response);
}
