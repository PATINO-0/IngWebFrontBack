// src/services/products.ts
import { request } from './http';

export type ProductDTO = {
  name: string;
  image: string;
  description: string;
  price: number;
  categoryId: number;
};

export type Product = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  created_at: string;
  category_id: number;
};

export const listProducts = (q?: Record<string, string | number>) => {
  const qs = q ? '?' + new URLSearchParams(q as any).toString() : '';
  return request('/products' + qs) as Promise<Product[]>;
};

export const getProduct = (id: number) =>
  request(`/products/${id}`) as Promise<Product>;

export const createProduct = (dto: ProductDTO) =>
  request('/products', { method: 'POST', body: dto });
