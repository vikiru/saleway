import type { CartItem, Cart as DbCart } from '@/generated/prisma';

export type Cart = DbCart & {
  items?: CartItem[];
};
