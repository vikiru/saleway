import type { Metadata } from 'next';

import { getProducts } from '@/features/product/api/product';
import { HomePage } from '@/views/home/HomePage';

export const metadata: Metadata = {
  title: 'Saleway - Modern E-Commerce',
  description: 'Shop the latest products at Saleway.',
};

export default async function Home() {
  const products = await getProducts();
  return <HomePage products={products} />;
}
