export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters: string) => [...productKeys.lists(), { filters }] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: string | number) => [...productKeys.details(), id] as const,
};

export const orderKeys = {
  all: ['orders'] as const,
  lists: () => [...orderKeys.all, 'list'] as const,
  byUser: (userId: string) => [...orderKeys.lists(), { userId }] as const,
  details: () => [...orderKeys.all, 'detail'] as const,
  detail: (id: string | number) => [...orderKeys.details(), id] as const,
};

export const cartKeys = {
  all: ['cart'] as const,
  single: (userId: string) => [...cartKeys.all, userId] as const,
};

export const userKeys = {
  all: ['users'] as const,
  single: (id: string) => [...userKeys.all, id] as const,
};

export const ratingKeys = {
  all: ['ratings'] as const,
  byProduct: (productId: string) => [...ratingKeys.all, 'product', productId] as const,
  byUser: (userId: string) => [...ratingKeys.all, 'user', userId] as const,
};

export const paymentKeys = {
  all: ['payments'] as const,
  verify: (sessionId: string) => [...paymentKeys.all, 'verify', sessionId] as const,
};
