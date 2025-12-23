import type { Cart as DBCart, CartItem } from '@/generated/prisma';

export type Cart = DBCart & {
  items?: CartItem[];
};
