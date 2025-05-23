// Types pour l'application T-Market

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  images: string[];
  features: string[];
  additionalDetails: string[];
}

export interface SubCategory {
  id: string;
  name: string;
  image: string;
  categoryId: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  subCategories?: string[]; // IDs des sous-catégories
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type SortOption =
  | "default"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc"
  | "newest";

export interface FilterOptions {
  searchQuery: string;
  category: string;
  minPrice: number | null;
  maxPrice: number | null;
  inStock: boolean;
  sortBy?: SortOption;
  onSale?: boolean;
  freeShipping?: boolean;
}
