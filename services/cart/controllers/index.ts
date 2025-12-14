import type { Response } from 'express';
import { logger } from '@/config/logger';
import type { CartItem } from '@/generated/prisma';
import * as CartService from '@/services/index';
import type { UserRequest } from '@/types/UserRequest';

export async function addCartItemsToCart(req: UserRequest, res: Response) {
  const { userId } = req.params;
  const cartItems: CartItem[] = req.body;
  try {
    const cart = await CartService.addCartItemsToCart(userId, cartItems);
    logger.info('Successfully added items to the cart.');
    return res.status(201).json(cart);
  } catch (error) {
    logger.error(`An error occurred while adding items to the cart: ${error}`);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export async function createCart(req: UserRequest, res: Response) {
  const { userId } = req.params;
  try {
    const existingCart = await CartService.retrieveCartByUserId(userId);
    if (existingCart) {
      logger.info(`Cart for user ${userId} already exists.`);
      return res.status(200).json(existingCart);
    }
    const cart = await CartService.createCartForUser(userId);
    logger.info('Successfully created cart.');
    return res.status(201).json(cart);
  } catch (error) {
    logger.error(`An error occurred while creating the cart: ${error}`);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export async function deleteCartByUserId(req: UserRequest, res: Response) {
  const { userId } = req.params;
  try {
    const cart = await CartService.deleteCartByUserId(userId);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found.' });
    }
    return res.status(200).json({ message: 'Cart deleted successfully.' });
  } catch (error) {
    logger.error(`An error occurred while deleting the cart: ${error}`);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export async function deleteCartItemById(req: UserRequest, res: Response) {
  const { userId, cartItemId } = req.params;
  try {
    const cart = await CartService.deleteCartItemById(userId, cartItemId);
    if (!cart) {
      return res.status(404).json({ message: 'Item not found in cart.' });
    }
    logger.info('Successfully deleted item from cart.');
    return res.status(200).json(cart);
  } catch (error) {
    logger.error(`An error occurred while deleting item from cart: ${error}`);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export async function retrieveCartByUserId(req: UserRequest, res: Response) {
  const { userId } = req.params;
  try {
    const cart = await CartService.retrieveCartByUserId(userId);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found.' });
    }
    logger.info('Successfully retrieved cart.');
    return res.status(200).json(cart);
  } catch (error) {
    logger.error(`An error occurred while retrieving the cart: ${error}`);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export async function updateCartItemById(req: UserRequest, res: Response) {
  const { userId } = req.params;
  const updatedItem: CartItem = req.body;
  try {
    const cart = await CartService.updateCartItemById(userId, updatedItem);
    if (!cart) {
      return res.status(404).json({ message: 'Item not found in cart.' });
    }
    logger.info('Successfully updated item in cart.');
    return res.status(200).json(cart);
  } catch (error) {
    logger.error(`An error occurred while updating item in cart: ${error}`);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
