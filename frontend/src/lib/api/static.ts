import productsData from '@/data/products.json';
import type { Product, ProductResponse, ProductsResponse } from '@/lib/types/product';


export function getProducts(): ProductsResponse {
  const products = (productsData.data || []).map((p: any) => ({
    ...p,
    id: p.id,
    price: typeof p.price === 'string' ? Number.parseFloat(p.price) : p.price,
    createdAt: p.createdAt || p.created_at,
    updatedAt: p.updatedAt || p.updated_at,
    image: p.image
      ? {
        id: p.image.id,
        productId: p.image.productId || p.image.product_id,
        image_url: p.image.image_url,
        imageAuthor: p.image.imageAuthor || p.image.image_author,
        altText: p.image.altText || p.image.alt_text || '',
        attribution: p.image.attribution || '',
        createdAt: p.image.createdAt || p.image.created_at,
        updatedAt: p.image.updatedAt || p.image.updated_at,
      }
      : undefined,
  }));

  return {
    success: true,
    data: products as Product[],
  };
}

export function getProduct(productId: number | string): ProductResponse {
  const id = typeof productId === 'string' ? Number.parseInt(productId, 10) : productId;
  const allProductsResponse = getProducts();
  const product = allProductsResponse.data?.find((p) => p.id === id);

  if (!product) {
    return {
      success: false,
      error: 'Product not found',
    };
  }

  return {
    success: true,
    data: product,
  };
}
