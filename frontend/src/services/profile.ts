// src/services/profile.ts
import { request } from './http';

export type Me = { id: number; email: string; role: 'admin' | 'customer'; created_at: string };
export type MyOrder = { id: number; created_at: string; customer_id: number };

export const getMe = () => request('/profile/my-user', { auth: true }) as Promise<Me>;
export const getMyOrders = () => request('/profile/my-orders', { auth: true }) as Promise<MyOrder[]>;
