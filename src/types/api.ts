// src/types/api.ts

/**
 * Generic wrapper for API responses.
 * This can be used by UI components to manage state based on API calls.
 * The apiService itself will typically return T or throw an error.
 */
export interface ApiResponse<T> {
  data: T | null;
  error: Error | string | null; // Can be an Error object or a string message
  isLoading: boolean;
  success: boolean; // Explicit success flag
}

// --- Example Product Entity Types ---

// Represents a Product as returned by the API
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  sku: string;
  stock: number;
  categoryId: string;
  images: string[]; // URLs to images
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

// Response type for getting a single product
export type GetProductResponse = Product;

// Response type for getting a list of products
// Could include pagination info if the API supports it
export interface GetProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}

// Payload for creating a new product
export interface CreateProductPayload {
  name: string;
  description: string;
  price: number;
  sku: string;
  stock: number;
  categoryId: string;
  images?: string[];
}

// Response type after creating a product (usually the created product)
export type CreateProductResponse = Product;

// Payload for updating an existing product (all fields optional)
export interface UpdateProductPayload {
  name?: string;
  description?: string;
  price?: number;
  sku?: string;
  stock?: number;
  categoryId?: string;
  images?: string[];
}

// Response type after updating a product (usually the updated product)
export type UpdateProductResponse = Product;

// For DELETE operations, often there's no content in the response body
// or just a success message.
export interface DeleteProductResponse {
  success: boolean;
  message?: string;
}

// --- Example Error Response from API ---
// It's good practice to define what an error response from your API might look like.
export interface ApiErrorResponse {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>; // For validation errors, field-specific messages
}
