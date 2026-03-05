export type OrderStatus = 'pending' | 'completed' | 'cancelled' | 'delivered';

export interface OrderCreate {
  userId: string;
  items: OrderItemCreate[];
  purchaseDate: string;
  totalPrice: number;
}

export interface OrderItemCreate {
  productId: number;
  productName: string;
  productBrand: string;
  productDescription: string;
  productImage: string;
  productUnitPrice: number;
  productQuantity: number;
}

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  productBrand: string;
  productDescription: string;
  productImage: string;
  productUnitPrice: number;
  productTotalPrice: number;
  productQuantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: number;
  userId: string;
  purchaseDate: string;
  expectedDeliveryDate: string;
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

export interface OrderResponse {
  success: boolean;
  data?: Order;
  error?: string;
}

export interface OrdersResponse {
  success: boolean;
  data?: Order[];
  error?: string;
}
