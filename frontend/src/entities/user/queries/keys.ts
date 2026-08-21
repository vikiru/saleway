export const userKeys = {
  all: ['users'] as const,
  single: (id: string) => [...userKeys.all, id] as const,
};
