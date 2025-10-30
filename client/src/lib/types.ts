// Type definitions for the application
// You can use Zod schemas for runtime validation if preferred

export interface Product {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  stock: number;
  category: string;
  createdAt: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  totalPages: number;
}

