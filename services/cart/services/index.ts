import { logger } from '@/config/logger';
import { prisma } from '@/data/index';
import type { CartItem } from '@/generated/prisma';
import { Prisma } from '@/generated/prisma';

export async function addCartItemsToCart(userId: string, cartItems: CartItem[]) {
  try {
    return await prisma.$transaction(async tx => {
      const cart = await tx.cart.findUnique({ where: { userId } });
      if (!cart) {
        throw new Error(`Cart not found for ${userId}.`);
      }

      const cartId = cart.cartId;
      const itemsTotalPrice = cartItems.reduce(
        (acc, curr) => acc.plus(new Prisma.Decimal(curr.totalPrice)),
        new Prisma.Decimal(0)
      );

      await tx.cartItem.createMany({
        data: cartItems.map(cartItem => ({
          ...cartItem,
          cartId,
        })),
      });

      const updatedCart = await tx.cart.update({
        where: { userId },
        data: {
          totalPrice: new Prisma.Decimal(cart.totalPrice).plus(itemsTotalPrice),
        },
        include: { items: true },
      });

      logger.info('Successfully added items to cart.');
      return updatedCart;
    });
  } catch (error) {
    logger.error(`An error occurred while adding items to cart. ${error}`); throw error;
  }
}

export async function createCartForUser(userId: string) {
  try {
    const existingCart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });

    if (existingCart) {
      logger.info('Cart already exists for the user.');
      return existingCart;
    }

    const cart = await prisma.cart.create({
      data: { userId },
      include: { items: true },
    });

    logger.info('Successfully created cart.');
    return cart;
  } catch (error) {
    logger.error(`An error occurred while creating the cart, for ${userId} : ${error}`); throw error;
  }
}

export async function deleteCartByUserId(userId: string) {
  try {
    return await prisma.$transaction(async tx => {
      const cart = await tx.cart.findUnique({ where: { userId } });
      if (!cart) {
        throw new Error(`Cart not found for ${userId}.`);
      }

      await tx.cartItem.deleteMany({ where: { cartId: cart.cartId } });

      const updatedCart = await tx.cart.update({
        where: { userId },
        data: { totalPrice: new Prisma.Decimal(0) },
        include: { items: true },
      });

      logger.info('Successfully deleted all items from cart and reset total price.');
      return updatedCart;
    });
  } catch (error) {
    logger.error(`An error occurred while deleting the cart, for ${userId} : ${error}`); throw error;
  }
}

export async function deleteCartItemById(userId: string, itemId: string) {
  try {
    return await prisma.$transaction(async tx => {
      const cart = await tx.cart.findUnique({ where: { userId } });
      if (!cart) {
        throw new Error(`Cart not found for ${userId}.`);
      }

      const item = await tx.cartItem.findUnique({
        where: { cartItemId: itemId },
      });

      if (!item) {
        throw new Error(`Item not found for ${itemId}.`);
      }

      const itemPrice = new Prisma.Decimal(item.totalPrice);
      await tx.cartItem.delete({ where: { cartItemId: itemId } });

      const updatedCart = await tx.cart.update({
        where: { userId },
        data: {
          totalPrice: new Prisma.Decimal(cart.totalPrice).minus(itemPrice),
        },
        include: { items: true },
      });

      logger.info('Successfully deleted item from cart.');
      return updatedCart;
    });
  } catch (error) {
    logger.error(`An error occurred while deleting item from cart. ${error}`); throw error;
  }
}

export async function retrieveCartByUserId(userId: string) {
  try {
    return await prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });
  } catch (error) {
    logger.error(`An error occurred while retrieving the cart, for ${userId} : ${error}`); throw error;
  }
}

export async function updateCartItemById(userId: string, updatedItem: CartItem) {
  try {
    return await prisma.$transaction(async tx => {
      const cart = await tx.cart.findUnique({ where: { userId } });
      if (!cart) {
        throw new Error(`Cart not found for ${userId}.`);
      }

      const item = await tx.cartItem.findUnique({
        where: { cartItemId: updatedItem.cartItemId },
      });

      if (!item) {
        throw new Error(`Item not found for ${updatedItem.cartItemId}.`);
      }

      const oldItemPrice = new Prisma.Decimal(item.totalPrice);
      const newItemPrice = new Prisma.Decimal(updatedItem.totalPrice);

      await tx.cartItem.update({
        where: { cartItemId: updatedItem.cartItemId },
        data: updatedItem,
      });

      const updatedCart = await tx.cart.update({
        where: { userId },
        data: {
          totalPrice: new Prisma.Decimal(cart.totalPrice).minus(oldItemPrice).plus(newItemPrice),
        },
        include: { items: true },
      });

      logger.info('Successfully updated item from cart.');
      return updatedCart;
    });
  } catch (error) {
    logger.error(`An error occurred while updating item from cart. ${error}`); throw error;
  }
}

export async function syncCartByUserId(
  userId: string,
  items: Array<{ productId: string; quantity: number; unitPrice: number }>
) {
  try {
    return await prisma.$transaction(async tx => {
      let cart = await tx.cart.findUnique({
        where: { userId },
        include: { items: true },
      });

      if (!cart) {
        cart = await tx.cart.create({
          data: { userId },
          include: { items: true },
        });
      }

      const existingProductIds = new Set(cart.items.map(i => i.productId));
      const syncProductIds = new Set(items.map(i => i.productId));

      for (const item of items) {
        if (item.quantity <= 0) {
          if (existingProductIds.has(item.productId)) {
            await tx.cartItem.deleteMany({
              where: { cartId: cart.cartId, productId: item.productId },
            });
          }
          continue;
        }

        const itemTotalPrice = new Prisma.Decimal(item.unitPrice).mul(item.quantity);

        if (existingProductIds.has(item.productId)) {
          await tx.cartItem.updateMany({
            where: { cartId: cart.cartId, productId: item.productId },
            data: {
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              totalPrice: itemTotalPrice,
            },
          });
        } else {
          await tx.cartItem.create({
            data: {
              cartId: cart.cartId,
              productId: item.productId,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              totalPrice: itemTotalPrice,
            },
          });
        }
      }

      for (const existingItem of cart.items) {
        if (!syncProductIds.has(existingItem.productId)) {
          await tx.cartItem.delete({
            where: { cartItemId: existingItem.cartItemId },
          });
        }
      }

      const allItems = await tx.cartItem.findMany({ where: { cartId: cart.cartId } });
      const totalCartPrice = allItems.reduce(
        (sum, i) => sum.plus(new Prisma.Decimal(i.totalPrice)),
        new Prisma.Decimal(0)
      );

      await tx.cart.update({
        where: { userId },
        data: { totalPrice: totalCartPrice },
      });

      logger.info('Successfully synced cart.');
      return { success: true };
    });
  } catch (error) {
    logger.error(`An error occurred while syncing cart: ${error}`); throw error;
    return { success: false };
  }
}
