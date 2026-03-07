export interface ProductImage {
  id: number;
  productId: number;
  image_url: string;
  imageAuthor: string;
  altText: string;
  attribution: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  summary: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  image: ProductImage;
}

export interface ProductWithRating extends Product {
  rating?: number;
  reviewCount?: number;
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
  productId: number;
  image_url: string;
  imageAuthor: string;
  altText: string;
  attribution: string;
}

import type { ServiceResponse } from '@/shared/api/types';

export type ProductResponse = ServiceResponse<Product>;

export type ProductsResponse = ServiceResponse<Product[]>;

export type ProductSearchResponse = ServiceResponse<{
  products: Product[];
  total: number;
  page: number;
  pageSize: number;
}>;

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}
