import { validatedEnv } from '@/shared/config/env';

export const CART_SERVICE_URL = validatedEnv.CART_SERVICE_URL;
export const ORDER_SERVICE_URL = validatedEnv.ORDER_SERVICE_URL;
export const PAYMENT_SERVICE_URL = validatedEnv.PAYMENT_SERVICE_URL;
export const PRODUCT_SERVICE_URL = validatedEnv.PRODUCT_SERVICE_URL;
export const RATING_SERVICE_URL = validatedEnv.RATING_SERVICE_URL;
export const USER_SERVICE_URL = validatedEnv.USER_SERVICE_URL;

export const SIGNIN_ROUTE = '/auth/login';
export const SIGNUP_ROUTE = '/auth/signup';
export const HOME_ROUTE = '/';
export const SEARCH_ROUTE = '/search';
export const PRODUCTS_ROUTE = '/products';
export const CART_ROUTE = '/cart';
export const CHECKOUT_ROUTE = '/checkout';
export const CHECKOUT_SUCCESS_ROUTE = '/checkout/success';
export const CHECKOUT_CANCEL_ROUTE = '/checkout/cancel';
export const ORDERS_ROUTE = '/orders';
export const DASHBOARD_ROUTE = '/dashboard';
export const ONBOARDING_ROUTE = '/onboarding';

export const getProductRoute = (id: string | number) => `/products/${id}`;
export const getOrderRoute = (id: string | number) => `/orders/${id}`;
