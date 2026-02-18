export const cartQueryKey = (userId: string) => ['cart', userId] as const;
export const cartItemsQueryKey = (userId: string) => ['cart', userId, 'items'] as const;

export const orderQueryKey = (orderId: string) => ['order', orderId] as const;
export const userOrdersQueryKey = (userId: string) => ['orders', 'user', userId] as const;

export const productQueryKey = (productId: string) => ['product', productId] as const;
export const productsQueryKey = (params?: Record<string, unknown>) => ['products', params] as const;

export const productRatingsQueryKey = (productId: string) => ['ratings', 'product', productId] as const;
export const userRatingsQueryKey = (userId: string) => ['ratings', 'user', userId] as const;

export const currentUserQueryKey = (userId: string) => ['user', 'current', userId] as const;
export const userQueryKey = (userId: string) => ['user', userId] as const;

export const paymentVerifyQueryKey = (sessionId: string) => ['payment', 'verify', sessionId] as const;
