export const ratingKeys = {
  all: ['ratings'] as const,
  byProduct: (productId: string) => [...ratingKeys.all, 'product', productId] as const,
  byUser: (userId?: string) => [...ratingKeys.all, 'user', userId] as const,
  average: (productId: string) => [...ratingKeys.all, 'average', productId] as const,
};
