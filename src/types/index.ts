// Types pour l'application T-Market

// Types d'utilisateurs
export type UserRole = "supplier" | "reseller";

export interface User {
  id: string;
  phone: string;
  name: string;
  email?: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  isActive: boolean;
}

// Types pour les fournisseurs
export interface Supplier extends User {
  role: "supplier";
  businessName: string;
  businessDescription?: string;
  businessLicense?: string;
  shops: string[]; // IDs des boutiques
  totalProducts: number;
  rating: number;
  reviewCount: number;
}

// Types pour les revendeurs
export interface Reseller extends User {
  role: "reseller";
  followedShops: string[]; // IDs des boutiques suivies
  favoriteProducts: string[]; // IDs des produits favoris
  favoriteShops: string[]; // IDs des boutiques favorites
  purchaseHistory: string[]; // IDs des commandes
  recentlyViewed: string[]; // IDs des produits récemment consultés
}

// Types pour les boutiques
export interface Shop {
  id: string;
  name: string;
  description: string;
  banner: string;
  logo: string;
  supplierId: string;
  categories: string[]; // IDs des catégories de la boutique
  products: string[]; // IDs des produits
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  rating: number;
  reviewCount: number;
  followers: number;
  location?: {
    address: string;
    city: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  contact: {
    phone: string;
    email?: string;
    whatsapp?: string;
  };
  businessHours?: {
    open: string;
    close: string;
    days: string[];
  };
  deliveryInfo?: {
    zones: string[];
    minOrder: number;
    deliveryFee: number;
    freeDeliveryThreshold?: number;
  };
}

// Types pour les produits (mis à jour)
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // Prix avant réduction
  stock: number;
  minOrder: number;
  maxOrder?: number;
  categoryId: string;
  shopId: string; // Boutique à laquelle appartient le produit
  supplierId: string; // Fournisseur du produit
  images: string[];
  features: string[];
  specifications: { [key: string]: string };
  tags: string[];
  isActive: boolean;
  isFeatured: boolean;
  isOnSale: boolean;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
  orderCount: number;
  rating: number;
  reviewCount: number;
  weight?: number;
  category?: Category;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  variants?: ProductVariant[];
}

// Variantes de produits
export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  stock: number;
  originalPrice?: number;
  attributes: { [key: string]: string }; // couleur, taille, etc.
  images?: string[];
}

// Types pour les catégories (mis à jour)
export interface Category {
  id: string;
  name: string;
  description?: string;
  image: string;
  icon?: string;
  shopId?: string; // Si null, c'est une catégorie globale
  parentCategoryId?: string; // Pour les sous-catégories
  subCategories?: string[]; // IDs des sous-catégories
  productCount: number;
  isActive: boolean;
  sortOrder: number;
}

export interface SubCategory {
  id: string;
  name: string;
  image: string;
  categoryId: string;
  shopId?: string;
  productCount: number;
  isActive: boolean;
}

// Types pour le panier
export interface CartItem {
  id: string;
  product: Product;
  variant?: ProductVariant;
  quantity: number;
  addedAt: string;
  shopId: string;
}

// Types pour les commandes
export interface Order {
  id: string;
  resellerId: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  deliveryInfo: DeliveryInfo;
  createdAt: string;
  updatedAt: string;
  notes?: string;
  trackingNumber?: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  variantId?: string;
  shopId: string;
  supplierId: string;
  productName: string;
  productImage: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export type PaymentMethod =
  | "mtn_momo"
  | "orange_money"
  | "moov_flooz"
  | "wave_ci"
  | "cash_on_delivery"
  | "bank_transfer";

export type PaymentStatus = "pending" | "completed" | "failed" | "refunded";

export interface DeliveryInfo {
  address: string;
  city: string;
  phone: string;
  alternativePhone?: string;
  instructions?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  estimatedDeliveryDate?: string;
  deliveryFee: number;
}

// Types pour les notifications
export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: any;
  isRead: boolean;
  createdAt: string;
  expiresAt?: string;
}

export type NotificationType =
  | "new_product"
  | "new_shop"
  | "order_update"
  | "payment_update"
  | "promotion"
  | "system"
  | "shop_update";

// Types pour les filtres et recherche
export type SortOption =
  | "default"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc"
  | "newest"
  | "popular"
  | "rating";

export interface FilterOptions {
  searchQuery: string;
  categoryId?: string;
  shopId?: string;
  supplierId?: string;
  minPrice: number | null;
  maxPrice: number | null;
  inStock: boolean;
  sortBy?: SortOption;
  onSale?: boolean;
  freeShipping?: boolean;
  rating?: number;
  location?: string;
}

// Types pour les statistiques
export interface ShopStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  averageRating: number;
  followers: number;
  viewCount: number;
  topProducts: Product[];
  recentOrders: Order[];
}

export interface SupplierStats {
  totalShops: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  averageRating: number;
  topShops: Shop[];
  topProducts: Product[];
}

// Types pour l'authentification
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token?: string;
}

export interface LoginCredentials {
  phone: string;
  password: string;
}

export interface RegisterData {
  phone: string;
  password: string;
  name: string;
  role: UserRole;
  businessName?: string; // Pour les fournisseurs
}

// Types pour les favoris et suivis
export interface Follow {
  id: string;
  userId: string;
  shopId: string;
  createdAt: string;
}

export interface Favorite {
  id: string;
  userId: string;
  itemId: string;
  itemType: "product" | "shop";
  createdAt: string;
}

// Types pour les avis et évaluations
export interface Review {
  id: string;
  userId: string;
  itemId: string;
  itemType: "product" | "shop";
  rating: number;
  comment?: string;
  images?: string[];
  createdAt: string;
  updatedAt: string;
  isVerifiedPurchase: boolean;
}

// Types pour les promotions
export interface Promotion {
  id: string;
  title: string;
  description: string;
  type: "percentage" | "fixed_amount" | "free_shipping";
  value: number;
  shopId?: string;
  productIds?: string[];
  categoryIds?: string[];
  minOrderAmount?: number;
  maxDiscount?: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  usageLimit?: number;
  usageCount: number;
  code?: string;
}

// Types pour les API responses
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Types pour la navigation
export interface NavigationParams {
  shop?: Shop;
  product?: Product;
  category?: Category;
  order?: Order;
  user?: User;
}
