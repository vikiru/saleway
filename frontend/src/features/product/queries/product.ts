import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { getProduct, getProducts } from '@/features/product/api/product';
import { productKeys } from '@/features/product/queries/keys';

export function useProduct(productId: string) {
  return useQuery({
    queryKey: productKeys.single(productId),
    queryFn: () => getProduct(productId),
    enabled: !!productId,
  });
}

export function useProducts() {
  return useQuery({
    queryKey: productKeys.all(),
    queryFn: () => getProducts(),
  });
}

export function useSuspenseProduct(productId: string) {
  return useSuspenseQuery({
    queryKey: productKeys.single(productId),
    queryFn: () => getProduct(productId),
  });
}

export function useSuspenseProducts() {
  return useSuspenseQuery({
    queryKey: productKeys.all(),
    queryFn: () => getProducts(),
  });
}
