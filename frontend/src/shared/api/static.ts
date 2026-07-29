import productsData from '@/data/products.json';
import type { Product, ProductImage } from '@/features/product/types/product';

interface RawImage {
  id?: number;
  product_id?: number;
  image_url: string;
  image_author: string;
  alt_text: string;
  attribution: string;
  created_at: string;
  updated_at: string;
}

interface RawProduct {
  id?: number;
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

const mapImage = (img: RawImage, id: number): ProductImage => ({
  id: img.id || id,
  product_id: img.product_id || id,
  image_url: img.image_url,
  image_author: img.image_author,
  alt_text: img.alt_text,
  attribution: img.attribution,
  created_at: img.created_at,
  updated_at: img.updated_at,
});

const mapProduct = (p: RawProduct, index: number): Product => {
  const id = p.id || index + 1;
  return {
    id,
    name: p.name,
    brand: p.brand,
    category: p.category,
    summary: p.summary,
    description: p.description,
    price: Number(p.price),
    created_at: p.created_at,
    updated_at: p.updated_at,
    image: mapImage(p.image, id),
  };
};

const staticProducts: Product[] = (productsData.data as RawProduct[]).map(mapProduct);

export function getProducts(): Product[] {
  return staticProducts;
}

export function getProduct(productId: number | string): Product | undefined {
  return staticProducts.find((p) => p.id === Number(productId));
}
