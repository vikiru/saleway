export interface Cart {
  cartId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  totalPrice: number;
  items: CartItem[];
}

export interface CartItem {
  cartItemId: string;
  productId: string;
  cartId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface CartCreateInput {
  userId: string;
}

export interface CartItemCreateInput {
  productId: string;
  quantity: number;
}

export interface CartUpdateInput {
  quantity?: number;
}

export interface CartResponse {
  success: boolean;
  data?: Cart;
  error?: string;
}

export interface CartItemResponse {
  success: boolean;
  data?: CartItem;
  error?: string;
}

export interface CartItemsResponse {
  success: boolean;
  data?: CartItem[];
  error?: string;
}
