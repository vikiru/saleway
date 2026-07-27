export interface ProductImage {
  id: number;
  product_id: number;
  image_url: string;
  image_author: string;
  alt_text: string;
  attribution: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  summary: string;
  description: string;
  price: number;
  created_at: string;
  updated_at: string;
  image: ProductImage;
}

export interface ProductWithRating extends Product {
  rating?: number;
  review_count?: number;
}

export interface ProductCreate {
  name: string;
  brand: string;
  category: string;
  summary: string;
  description: string;
  price: number;
}

export interface ProductUpdate {
  name?: string;
  brand?: string;
  category?: string;
  summary?: string;
  description?: string;
  price?: number;
}

export interface ProductImageCreate {
  product_id: number;
  image_url: string;
  image_author: string;
  alt_text: string;
  attribution: string;
}

import type { ServiceResponse } from '@/shared/api/types';

export type ProductResponse = ServiceResponse<Product>;

export type ProductsResponse = ServiceResponse<Product[]>;

export type ProductSearchResponse = ServiceResponse<{
  products: Product[];
  total: number;
  page: number;
  page_size: number;
}>;
