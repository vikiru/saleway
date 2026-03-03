export const cartKeys = {
  all: (userId: string) => ['cart', userId] as const,
};

export const orderKeys = {
  single: (orderId: number | string) => ['order', String(orderId)] as const,
  byUser: (userId: string) => ['orders', 'user', userId] as const,
};

export const productKeys = {
  all: () => ['products'] as const,
  single: (productId: number | string) => ['product', String(productId)] as const,
};

export const ratingKeys = {
  byProduct: (productId: number | string) => ['product', String(productId), 'ratings'] as const,
  byUser: (userId: string) => ['ratings', 'user', userId] as const,
};

export const userKeys = {
  current: (userId: string) => ['user', 'current', userId] as const,
  single: (userId: string) => ['user', userId] as const,
};

export const paymentKeys = {
  verify: (sessionId: string) => ['payment', 'verify', sessionId] as const,
};

export const cartQueryKey = cartKeys.all;
export const cartItemsQueryKey = cartKeys.all;

export const orderQueryKey = orderKeys.single;
export const userOrdersQueryKey = orderKeys.byUser;

export const productsQueryKey = productKeys.all;
export const productQueryKey = productKeys.single;
export const productRatingsQueryKey = ratingKeys.byProduct;

export const userRatingsQueryKey = ratingKeys.byUser;

export const currentUserQueryKey = userKeys.current;
export const userQueryKey = userKeys.single;

export const paymentVerifyQueryKey = paymentKeys.verify;
