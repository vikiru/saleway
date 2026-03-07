import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { getProduct, getProducts } from '@/features/product/api/product';
import { productKeys } from '@/lib/queries/keys';

export function useProduct(productId: string) {
  return useQuery({
    queryKey: productKeys.detail(productId),
    queryFn: () => getProduct(productId),
    enabled: !!productId,
  });
}

export function useProducts() {
  return useQuery({
    queryKey: productKeys.lists(),
    queryFn: () => getProducts(),
  });
}

export function useSuspenseProduct(productId: string) {
  return useSuspenseQuery({
    queryKey: productKeys.detail(productId),
    queryFn: () => getProduct(productId),
  });
}

export function useSuspenseProducts() {
  return useSuspenseQuery({
    queryKey: productKeys.lists(),
    queryFn: () => getProducts(),
  });
}
