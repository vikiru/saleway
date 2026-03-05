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

export interface ProductResponse {
  success: boolean;
  data?: Product;
  error?: string;
}

export interface ProductsResponse {
  success: boolean;
  data?: Product[];
  error?: string;
}

export interface ProductSearchResponse {
  success: boolean;
  data?: {
    products: Product[];
    total: number;
    page: number;
    pageSize: number;
  };
  error?: string;
}
