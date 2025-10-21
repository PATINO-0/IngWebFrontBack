// src/services/categories.ts
import { request } from './http';
export type Category = { id: number; name: string; image: string; created_at: string };
export const listCategories = () =>
  request('/categories', { auth: true }) as Promise<Category[]>;
