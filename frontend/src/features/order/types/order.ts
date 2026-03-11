export type OrderStatus = 'pending' | 'completed' | 'cancelled' | 'delivered';

import type { ServiceResponse } from '@/shared/api/types';

export interface OrderCreate {
  user_id: string;
  items: OrderItemCreate[];
  purchase_date: string;
  total_price: number;
  stripe_session_id: string;
}

export interface OrderItemCreate {
  product_id: number;
  product_name: string;
  product_brand: string;
  product_description: string;
  product_image: string;
  product_unit_price: number;
  product_quantity: number;
}

export interface OrderItem {
  id: number;
  product_id: number;
  product_name: string;
  product_brand: string;
  product_description: string;
  product_image: string;
  product_unit_price: number;
  product_total_price: number;
  product_quantity: number;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: number;
  user_id: string;
  purchase_date: string;
  expected_delivery_date: string;
  total_price: number;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
  items: OrderItem[];
}

export type OrderResponse = ServiceResponse<Order>;
export type OrdersResponse = ServiceResponse<Order[]>;
