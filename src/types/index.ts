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

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FilterOptions {
  searchQuery: string;
  category: string;
  minPrice: number | null;
  maxPrice: number | null;
  inStock: boolean;
}
