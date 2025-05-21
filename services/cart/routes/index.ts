import { Router } from 'express';

import * as CartController from '@/controllers/index';

const router = Router();

router.get('/cart/user/:userId', CartController.retrieveCartByUserId);
router.post('/cart/user/:userId', CartController.createCart);
router.post('/cart/user/:userId/item', CartController.addCartItemsToCart);
router.delete('/cart/user/:userId', CartController.deleteCartByUserId);
router.delete(
    '/cart/user/:userId/item/:cartItemId',
    CartController.deleteCartItemById,
);
router.put(
    '/cart/user/:userId/item/:cartItemId',
    CartController.updateCartItemById,
);

export default router;
