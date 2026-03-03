import { queryClient } from './client';
import { cartKeys, orderKeys, productKeys, ratingKeys, userKeys } from './keys';

export const revalidate = {
  cart: {
    all: (userId: string) => {
      queryClient.invalidateQueries({ queryKey: cartKeys.all(userId) });
    },
  },
  orders: {
    all: (userId: string) => {
      queryClient.invalidateQueries({ queryKey: orderKeys.byUser(userId) });
    },
    single: (orderId: string) => {
      queryClient.invalidateQueries({ queryKey: orderKeys.single(orderId) });
    },
  },
  products: {
    all: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all() });
    },
    single: (productId: string) => {
      queryClient.invalidateQueries({ queryKey: productKeys.single(productId) });
    },
  },
  ratings: {
    byProduct: (productId: string) => {
      queryClient.invalidateQueries({ queryKey: ratingKeys.byProduct(productId) });
    },
    byUser: (userId: string) => {
      queryClient.invalidateQueries({ queryKey: ratingKeys.byUser(userId) });
    },
  },
  users: {
    current: (userId: string) => {
      queryClient.invalidateQueries({ queryKey: userKeys.current(userId) });
    },
    single: (userId: string) => {
      queryClient.invalidateQueries({ queryKey: userKeys.single(userId) });
    },
  },
} as const;
