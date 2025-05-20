import { logger } from "@/config/logger";
import { prisma } from "@/data/index";
import { CartItem } from "@/generated/prisma";

export async function createCartForUser(userId: string) {
  try {
    const existingCart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (existingCart) {
      logger.info("Cart already exists for the user.");
      return existingCart;
    }

    const cart = await prisma.cart.create({
      data: {
        userId,
      },
      include: { items: true },
    });
    logger.info("Successfully created cart.");
    return cart;
  } catch (error) {
    logger.error(
      `An error occurred while creating the cart, for ${userId} : ${error}`,
    );
  }
}

export async function retrieveCartByUserId(userId: string) {
  try {
    const cart = await prisma.cart.findUnique({
      where: {
        userId,
      },
      include: { items: true },
    });
    return cart;
  } catch (error) {
    logger.error(
      `An error occurred while retrieving the cart, for ${userId} : ${error}`,
    );
  }
}

export async function addCartItemsToCart(
  userId: string,
  cartItems: CartItem[],
) {
  try {
    const cart = await prisma.cart.findUnique({ where: { userId } });
    if (!cart) {
      throw new Error(`Cart not found for ${userId}.`);
    }
    const cartId = cart.cartId;
    const totalPrice = cartItems.reduce((acc, curr) => {
      return acc + Number(curr.totalPrice);
    }, 0);

    await prisma.cartItem.createMany({
      data: cartItems.map((cartItem) => ({
        ...cartItem,
        cartId,
      })),
    });

    const updatedCart = await prisma.cart.update({
      where: {
        userId,
      },
      data: {
        totalPrice: Number(cart.totalPrice) + totalPrice,
      },
      include: { items: true },
    });
    logger.info("Successfully added items to cart.");
    return updatedCart;
  } catch (error) {
    logger.error(`An error occurred while adding items to cart. ${error}`);
  }
}

export async function deleteCartByUserId(userId: string) {
  try {
    const cart = await prisma.cart.findUnique({ where: { userId } });
    if (!cart) {
      throw new Error(`Cart not found for ${userId}.`);
    }
    const cartId = cart.cartId;
    await prisma.cartItem.deleteMany({ where: { cartId } });
    const updatedCart = await prisma.cart.update({
      where: { userId },
      data: { totalPrice: 0 },
      include: { items: true },
    });
    logger.info(
      "Successfully deleted all items from cart and reset total price.",
    );
    return updatedCart;
  } catch (error) {
    logger.error(
      `An error occurred while deleting the cart, for ${userId} : ${error}`,
    );
  }
}

export async function deleteCartItemById(userId: string, itemId: string) {
  try {
    const cart = await prisma.cart.findUnique({ where: { userId } });
    if (!cart) {
      throw new Error(`Cart not found for ${userId}.`);
    }
    const cartId = cart.cartId;
    const totalPrice = cart.totalPrice;
    const item = await prisma.cartItem.findUnique({
      where: { cartItemId: itemId },
    });

    if (!item) {
      throw new Error(`Item not found for ${itemId}.`);
    }

    const itemPrice = item.totalPrice;
    await prisma.cartItem.delete({
      where: { cartId: cartId, cartItemId: itemId },
    });
    const updatedCart = await prisma.cart.update({
      where: { userId },
      data: { totalPrice: Number(totalPrice) - Number(itemPrice) },
      include: { items: true },
    });
    logger.info("Successfully deleted item from cart.");
    return updatedCart;
  } catch (error) {
    logger.error("An error occurred while deleting item from cart.");
  }
}

export async function updateCartItemById(
  userId: string,
  updatedItem: CartItem,
) {
  try {
    const cart = await prisma.cart.findUnique({ where: { userId } });
    if (!cart) {
      throw new Error(`Cart not found for ${userId}.`);
    }
    const cartId = cart.cartId;
    const totalPrice = cart.totalPrice;
    const item = await prisma.cartItem.findUnique({
      where: { cartItemId: updatedItem.cartItemId },
    });

    if (!item) {
      throw new Error(`Item not found for ${updatedItem.cartItemId}.`);
    }

    const itemPrice = item.totalPrice;
    await prisma.cartItem.update({
      where: { cartId: cartId, cartItemId: updatedItem.cartItemId },
      data: updatedItem,
    });
    const updatedCart = await prisma.cart.update({
      where: { userId },
      data: {
        totalPrice:
          Number(totalPrice) -
          Number(itemPrice) +
          Number(updatedItem.totalPrice),
      },
      include: { items: true },
    });
    logger.info("Successfully updated item from cart.");
    return updatedCart;
  } catch (error) {
    logger.error("An error occurred while updating item from cart.");
  }
}
