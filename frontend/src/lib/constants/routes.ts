export const CART_SERVICE_URL = process.env.CART_SERVICE_URL || 'http://localhost:8080/api/v1';
export const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL || 'http://localhost:5000/api/v1';
export const PAYMENT_SERVICE_URL = process.env.PAYMENT_SERVICE_URL || 'http://localhost:8081/api/v1';
export const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || 'http://localhost:8000/api/v1';
export const RATING_SERVICE_URL = process.env.RATING_SERVICE_URL || 'http://localhost:8001/api/v1';
export const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:8002/api/v1';

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
