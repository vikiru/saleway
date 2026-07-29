import { Router } from 'express';

import * as CartController from '@/controllers/index';

import { clerkAuth } from '../middlewares/auth';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ message: 'Cart service is running.' });
});

router.use('/cart', clerkAuth);

router.get('/cart/user/:userId', CartController.retrieveCartByUserId);
router.post('/cart/user/:userId', CartController.createCart);
router.post('/cart/user/:userId/item', CartController.addCartItemsToCart);
router.post('/cart/user/:userId/sync', CartController.syncCart);
router.delete('/cart/user/:userId', CartController.deleteCartByUserId);
router.delete('/cart/user/:userId/item/:cartItemId', CartController.deleteCartItemById);
router.put('/cart/user/:userId/item/:cartItemId', CartController.updateCartItemById);

export default router;
