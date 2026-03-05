import type { Product, ProductImage, ProductsResponse, ProductResponse } from '@/features/product/types/product';
import productsData from '@/data/products.json';

interface RawImage {
  id: number;
  product_id: number;
  image_url: string;
  image_author: string;
  alt_text: string;
  attribution: string;
  created_at: string;
  updated_at: string;
}

interface RawProduct {
  id: number;
  name: string;
  brand: string;
  category: string;
  summary: string;
  description: string;
  price: string | number;
  created_at: string;
  updated_at: string;
  image: RawImage;
}

const mapImage = (img: RawImage): ProductImage => ({
  id: img.id,
  productId: img.product_id,
  image_url: img.image_url,
  imageAuthor: img.image_author,
  altText: img.alt_text,
  attribution: img.attribution,
  createdAt: img.created_at,
  updatedAt: img.updated_at,
});

const mapProduct = (p: RawProduct): Product => ({
  id: p.id,
  name: p.name,
  brand: p.brand,
  category: p.category,
  summary: p.summary,
  description: p.description,
  price: Number(p.price),
  createdAt: p.created_at,
  updatedAt: p.updated_at,
  image: mapImage(p.image),
});

const staticProducts: Product[] = (productsData.data as RawProduct[]).map(mapProduct);

export function getProducts(): ProductsResponse {
  return {
    success: true,
    data: staticProducts,
  };
}

export function getProduct(productId: number | string): ProductResponse {
  const product = staticProducts.find((p) => p.id === Number(productId));
  return {
    success: true,
    data: product,
  };
}
