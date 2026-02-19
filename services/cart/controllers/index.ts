import type { Response } from 'express';
import { logger } from '@/config/logger';
import type { CartItem } from '@/generated/prisma';
import * as CartService from '@/services/index';
import type { Cart } from '@/types/Cart';
import type { ServiceResponse } from '@/types/ServiceResponse';
import type { UserRequest } from '@/types/UserRequest';

export async function addCartItemsToCart(req: UserRequest, res: Response) {
  const { userId } = req.params;
  const cartItems: CartItem[] = req.body;
  try {
    const cart = await CartService.addCartItemsToCart(userId, cartItems);
    logger.info('Successfully added items to the cart.');
    const response: ServiceResponse<Cart | undefined> = {
      success: true,
      message: 'Items added to cart successfully',
      data: cart,
    };
    return res.status(201).json(response);
  } catch (error) {
    logger.error(`An error occurred while adding items to the cart: ${error}`);
    const response = {
      success: false,
      error: 'Internal Server Error',
    };
    return res.status(500).json(response);
  }
}

export async function createCart(req: UserRequest, res: Response) {
  const { userId } = req.params;
  try {
    const existingCart = await CartService.retrieveCartByUserId(userId);
    if (existingCart) {
      logger.info(`Cart for user ${userId} already exists.`);
      const response: ServiceResponse<Cart | undefined> = {
        success: true,
        message: 'Cart retrieved successfully',
        data: existingCart,
      };
      return res.status(200).json(response);
    }
    const cart = await CartService.createCartForUser(userId);
    logger.info('Successfully created cart.');
    const response: ServiceResponse<Cart | undefined> = {
      success: true,
      message: 'Cart created successfully',
      data: cart,
    };
    return res.status(201).json(response);
  } catch (error) {
    logger.error(`An error occurred while creating the cart: ${error}`);
    const response = {
      success: false,
      error: 'Internal Server Error',
    };
    return res.status(500).json(response);
  }
}

export async function deleteCartByUserId(req: UserRequest, res: Response) {
  const { userId } = req.params;
  try {
    const cart = await CartService.deleteCartByUserId(userId);
    if (!cart) {
      const response = {
        success: false,
        error: 'Cart not found',
      };
      return res.status(404).json(response);
    }
    const response = {
      success: true,
      message: 'Cart deleted successfully',
      data: { message: 'Cart deleted successfully.' },
    };
    return res.status(200).json(response);
  } catch (error) {
    logger.error(`An error occurred while deleting the cart: ${error}`);
    const response = {
      success: false,
      error: 'Internal Server Error',
    };
    return res.status(500).json(response);
  }
}

export async function deleteCartItemById(req: UserRequest, res: Response) {
  const { userId, cartItemId } = req.params;
  try {
    const cart = await CartService.deleteCartItemById(userId, cartItemId);
    if (!cart) {
      const response = {
        success: false,
        error: 'Item not found in cart',
      };
      return res.status(404).json(response);
    }
    logger.info('Successfully deleted item from cart.');
    const response: ServiceResponse<Cart | undefined> = {
      success: true,
      message: 'Item deleted from cart successfully',
      data: cart,
    };
    return res.status(200).json(response);
  } catch (error) {
    logger.error(`An error occurred while deleting item from cart: ${error}`);
    const response = {
      success: false,
      error: 'Internal Server Error',
    };
    return res.status(500).json(response);
  }
}

export async function retrieveCartByUserId(req: UserRequest, res: Response) {
  const { userId } = req.params;
  try {
    const cart = await CartService.retrieveCartByUserId(userId);
    if (!cart) {
      const response = {
        success: false,
        error: 'Cart not found',
      };
      return res.status(404).json(response);
    }
    logger.info('Successfully retrieved cart.');
    const response: ServiceResponse<Cart | undefined> = {
      success: true,
      message: 'Cart retrieved successfully',
      data: cart,
    };
    return res.status(200).json(response);
  } catch (error) {
    logger.error(`An error occurred while retrieving the cart: ${error}`);
    const response = {
      success: false,
      error: 'Internal Server Error',
    };
    return res.status(500).json(response);
  }
}

export async function updateCartItemById(req: UserRequest, res: Response) {
  const { userId } = req.params;
  const updatedItem: CartItem = req.body;
  try {
    const cart = await CartService.updateCartItemById(userId, updatedItem);
    if (!cart) {
      const response = {
        success: false,
        error: 'Item not found in cart',
      };
      return res.status(404).json(response);
    }
    logger.info('Successfully updated item in cart.');
    const response: ServiceResponse<Cart | undefined> = {
      success: true,
      message: 'Item updated in cart successfully',
      data: cart,
    };
    return res.status(200).json(response);
  } catch (error) {
    logger.error(`An error occurred while updating item in cart: ${error}`);
    const response = {
      success: false,
      error: 'Internal Server Error',
    };
    return res.status(500).json(response);
  }
}

export async function syncCart(req: UserRequest, res: Response) {
  const { userId } = req.params;
  const { items } = req.body;
  try {
    const result = await CartService.syncCartByUserId(userId, items);
    if (!result.success) {
      const response = {
        success: false,
        error: 'Failed to sync cart',
      };
      return res.status(500).json(response);
    }
    logger.info('Successfully synced cart.');
    const response = {
      success: true,
      message: 'Cart synced successfully',
    };
    return res.status(200).json(response);
  } catch (error) {
    logger.error(`An error occurred while syncing cart: ${error}`);
    const response = {
      success: false,
      error: 'Internal Server Error',
    };
    return res.status(500).json(response);
  }
}
