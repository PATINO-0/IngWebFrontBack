// src/services/orders.ts
import { request } from './http';

export type Order = { id: number; customer_id: number; created_at: string };
export type OrderItem = { id: number; order_id: number; product_id: number; amount: number; created_at: string };

export const createOrder = () =>
  request('/orders', { method: 'POST', auth: true }) as Promise<Order>;

export const addItemToOrder = (orderId: number, productId: number, amount: number) =>
  request('/orders/add-item', {
    method: 'POST',
    auth: true,
    body: { orderId, productId, amount },
  }) as Promise<OrderItem>;

export const getOrder = (id: number) =>
  request(`/orders/${id}`, { auth: true }) as Promise<Order & { items: OrderItem[] }>;

export const listOrders = () =>
  request('/orders', { auth: true }) as Promise<Order[]>;
