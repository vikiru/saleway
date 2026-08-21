export const cartKeys = {
  all: ['cart'] as const,
  single: (userId: string) => [...cartKeys.all, userId] as const,
};
