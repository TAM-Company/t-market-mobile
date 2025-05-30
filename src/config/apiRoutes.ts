// src/config/apiRoutes.ts

export const API_ROUTES = {
  // Products
  PRODUCTS: "/products",
  PRODUCT_DETAIL: (productId: string | number) => `/products/${productId}`,
  PRODUCT_SEARCH: (query: string) => `/products/search?q=${query}`, // Example with query param

  // Categories
  CATEGORIES: "/categories",
  CATEGORY_DETAIL: (categoryId: string | number) => `/categories/${categoryId}`,
  PRODUCTS_BY_CATEGORY: (categoryId: string | number) => `/categories/${categoryId}/products`,

  // Auth
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  PROFILE: "/auth/profile", // Get current user's profile
  REFRESH_TOKEN: "/auth/refresh-token",

  // Cart
  CART: "/cart",
  ADD_TO_CART: "/cart/items",
  UPDATE_CART_ITEM: (itemId: string | number) => `/cart/items/${itemId}`,
  REMOVE_FROM_CART: (itemId: string | number) => `/cart/items/${itemId}`,

  // Orders
  ORDERS: "/orders",
  ORDER_DETAIL: (orderId: string | number) => `/orders/${orderId}`,
  CREATE_ORDER: "/orders",

  // Users (example, if admin functionality exists)
  USERS: "/users",
  USER_DETAIL: (userId: string | number) => `/users/${userId}`,

  // More can be added as needed, e.g.:
  // SUPPLIERS: "/suppliers",
  // INVENTORY: "/inventory",
  // REVIEWS: "/reviews",
  // PRODUCT_REVIEWS: (productId: string | number) => `/products/${productId}/reviews`,
} as const;

// It can also be useful to have a function to construct URLs if query parameters are complex
// or if there are other common URL manipulations.
// For now, the simple functions within API_ROUTES are sufficient.

// Example of how these might be used with the apiService:
// import { apiService } from '../services/api';
// import { API_ROUTES } from './apiRoutes';
// import { GetProductsResponse, Product } from '../types/api';
//
// const fetchProductById = async (id: string) => {
//   return apiService.get<Product>(API_ROUTES.PRODUCT_DETAIL(id));
// };
//
// const fetchAllProducts = async () => {
//   return apiService.get<GetProductsResponse>(API_ROUTES.PRODUCTS);
// };
