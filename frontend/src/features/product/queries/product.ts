'use client';

import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { getProduct, getProducts } from '@/features/product/api/product';
import { productKeys } from '@/lib/queries/keys';

export function useProduct(productId: string) {
  return useQuery({
    queryKey: productKeys.detail(productId),
    queryFn: () => getProduct(productId),
    enabled: !!productId,
    staleTime: Infinity,
  });
}

export function useProducts() {
  return useQuery({
    queryKey: productKeys.lists(),
    queryFn: () => getProducts(),
    staleTime: Infinity,
  });
}

export function useSuspenseProduct(productId: string) {
  return useSuspenseQuery({
    queryKey: productKeys.detail(productId),
    queryFn: () => getProduct(productId),
    staleTime: Infinity,
  });
}

export function useSuspenseProducts() {
  return useSuspenseQuery({
    queryKey: productKeys.lists(),
    queryFn: () => getProducts(),
    staleTime: Infinity,
  });
}
