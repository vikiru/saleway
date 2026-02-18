import { PRODUCT_SERVICE_URL } from '@/lib/routes';
import type {
  ProductCreate,
  ProductResponse,
  ProductSearchResponse,
  ProductsResponse,
  ProductUpdate,
} from '@/lib/types/product';
import { handleResponse } from './fetch';

export async function fetchProducts(signal?: AbortSignal): Promise<ProductsResponse> {
  const response = await fetch(`${PRODUCT_SERVICE_URL}/products`, { signal });
  return handleResponse(response);
}

export async function fetchProduct(productId: number, signal?: AbortSignal): Promise<ProductResponse> {
  const response = await fetch(`${PRODUCT_SERVICE_URL}/products/${productId}`, { signal });
  return handleResponse(response);
}

export async function searchProducts(
  query: string,
  category?: string,
  brand?: string,
  page = 1,
  pageSize = 10,
  signal?: AbortSignal,
): Promise<ProductSearchResponse> {
  const params = new URLSearchParams({
    q: query,
    page: String(page),
    pageSize: String(pageSize),
  });
  if (category) params.append('category', category);
  if (brand) params.append('brand', brand);

  const response = await fetch(`${PRODUCT_SERVICE_URL}/products/search?${params}`, { signal });
  return handleResponse(response);
}

export async function createProduct(product: ProductCreate): Promise<ProductResponse> {
  const response = await fetch(`${PRODUCT_SERVICE_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  return handleResponse(response);
}

export async function updateProduct(productId: number, product: Partial<ProductUpdate>): Promise<ProductResponse> {
  const response = await fetch(`${PRODUCT_SERVICE_URL}/products/${productId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  return handleResponse(response);
}

export async function deleteProduct(productId: number): Promise<ProductResponse> {
  const response = await fetch(`${PRODUCT_SERVICE_URL}/products/${productId}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
}
