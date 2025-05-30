/**
 * Configuration centralisée des routes de l'application
 * Ce fichier centralise toutes les routes pour faciliter la maintenance et éviter les erreurs
 */

/**
 * Routes principales de l'application
 */
export const ROUTES = {
  // Routes d'authentification
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
  },

  // Routes principales (tabs)
  TABS: {
    HOME: "/(tabs)",
    COMMERCE: "/(tabs)/commerce",
    CUSTOMER: "/(tabs)/customer",
    MANAGEMENT: "/(tabs)/management",
  },

  // Routes de commerce
  COMMERCE: {
    PRODUCTS: "/commerce/products",
    CATEGORIES: "/commerce/categories",
    INVENTORY: "/commerce/inventory",
    ANALYTICS: "/commerce/analytics",
  },

  // Routes client
  CUSTOMER: {
    PROFILE: "/customer/profile",
    ORDERS: "/customer/orders",
    ORDER_DETAIL: (orderId: string) => `/customer/orders/${orderId}`,
    CART: "/panier",
    WISHLIST: "/customer/wishlist",
  },

  // Routes de gestion
  MANAGEMENT: {
    ORDERS: "/management/orders",
    INVENTORY: "/management/inventory",
    ANALYTICS: "/management/analytics",
    USERS: "/management/users",
  },

  // Routes de produits et catégories
  PRODUCTS: {
    LIST: "/produits",
    DETAIL: (productId: string | number) => `/product/${productId}`,
    SEARCH: "/produits/search",
  },

  CATEGORIES: {
    LIST: "/categorie",
    DETAIL: (categoryId: string | number) => `/category/${categoryId}`,
    SUBCATEGORY: (subcategoryId: string | number) =>
      `/subcategory/${subcategoryId}`,
  },

  // Routes de boutiques
  SHOPS: {
    LIST: "/shops",
    DETAIL: (shopId: string | number) => `/shops/${shopId}`,
  },

  // Routes de paiement
  PAYMENT: {
    INDEX: "/payment",
    CASH_DELIVERY: "/payment/cash-delivery",
    MTN_MOMO: "/payment/mtn-momo",
    ORANGE_MONEY: "/payment/orange-money",
    MOOV_FLOOZ: "/payment/moov-flooz",
    WAVE_CI: "/payment/wave-ci",
    CONFIRMATION: "/payment/confirmation",
  },

  // Routes utilitaires
  UTILS: {
    HELP: "/aide",
    NOTIFICATIONS: "/notifications",
    SETTINGS: "/settings",
    ABOUT: "/about",
  },

  // Routes de test
  TEST: {
    DEMO: "/teste",
  },
} as const;

/**
 * Types pour la validation des routes
 */
export type RouteKey = keyof typeof ROUTES;
export type RouteValue = (typeof ROUTES)[RouteKey];

/**
 * Utilitaires pour la navigation
 */
export const NavigationUtils = {
  /**
   * Vérifie si une route est valide
   */
  isValidRoute: (route: string): boolean => {
    const allRoutes = getAllRoutes();
    return allRoutes.includes(route);
  },

  /**
   * Obtient la route parent d'une route donnée
   */
  getParentRoute: (route: string): string | null => {
    const segments = route.split("/").filter(Boolean);
    if (segments.length <= 1) return null;

    segments.pop();
    return "/" + segments.join("/");
  },

  /**
   * Construit une route avec des paramètres
   */
  buildRoute: (
    template: string,
    params: Record<string, string | number>
  ): string => {
    let route = template;
    Object.entries(params).forEach(([key, value]) => {
      route = route.replace(`{${key}}`, String(value));
    });
    return route;
  },

  /**
   * Extrait les paramètres d'une route
   */
  extractParams: (route: string): Record<string, string> => {
    const params: Record<string, string> = {};
    const segments = route.split("/").filter(Boolean);

    segments.forEach((segment, index) => {
      if (segment.startsWith("[") && segment.endsWith("]")) {
        const paramName = segment.slice(1, -1);
        params[paramName] = segments[index] || "";
      }
    });

    return params;
  },
};

/**
 * Obtient toutes les routes de l'application
 */
function getAllRoutes(): string[] {
  const routes: string[] = [];

  const extractRoutes = (obj: any): void => {
    Object.values(obj).forEach((value) => {
      if (typeof value === "string") {
        routes.push(value);
      } else if (typeof value === "object" && value !== null) {
        extractRoutes(value);
      }
    });
  };

  extractRoutes(ROUTES);
  return routes;
}

/**
 * Configuration des routes protégées (nécessitent une authentification)
 */
export const PROTECTED_ROUTES = [
  ROUTES.CUSTOMER.PROFILE,
  ROUTES.CUSTOMER.ORDERS,
  ROUTES.CUSTOMER.CART,
  ROUTES.CUSTOMER.WISHLIST,
  ROUTES.MANAGEMENT.ORDERS,
  ROUTES.MANAGEMENT.INVENTORY,
  ROUTES.MANAGEMENT.ANALYTICS,
  ROUTES.MANAGEMENT.USERS,
  ROUTES.COMMERCE.PRODUCTS,
  ROUTES.COMMERCE.CATEGORIES,
  ROUTES.COMMERCE.INVENTORY,
  ROUTES.COMMERCE.ANALYTICS,
] as const;

/**
 * Configuration des routes publiques (accessibles sans authentification)
 */
export const PUBLIC_ROUTES = [
  ROUTES.AUTH.LOGIN,
  ROUTES.AUTH.REGISTER,
  ROUTES.PRODUCTS.LIST,
  ROUTES.CATEGORIES.LIST,
  ROUTES.SHOPS.LIST,
  ROUTES.UTILS.HELP,
  ROUTES.UTILS.ABOUT,
] as const;

/**
 * Configuration des routes de navigation principale (tabs)
 */
export const TAB_ROUTES = [
  {
    key: "home",
    route: ROUTES.TABS.HOME,
    title: "Accueil",
    icon: "home-outline",
  },
  {
    key: "commerce",
    route: ROUTES.TABS.COMMERCE,
    title: "Commerce",
    icon: "storefront-outline",
  },
  {
    key: "customer",
    route: ROUTES.TABS.CUSTOMER,
    title: "Client",
    icon: "person-outline",
  },
  {
    key: "management",
    route: ROUTES.TABS.MANAGEMENT,
    title: "Gestion",
    icon: "settings-outline",
  },
] as const;

/**
 * Middleware de validation des routes
 */
export const RouteMiddleware = {
  /**
   * Vérifie si l'utilisateur peut accéder à une route
   */
  canAccess: (route: string, isAuthenticated: boolean): boolean => {
    // Les routes publiques sont toujours accessibles
    if (PUBLIC_ROUTES.includes(route as any)) {
      return true;
    }

    // Les routes protégées nécessitent une authentification
    if (PROTECTED_ROUTES.includes(route as any)) {
      return isAuthenticated;
    }

    // Par défaut, autoriser l'accès
    return true;
  },

  /**
   * Obtient la route de redirection pour un utilisateur non authentifié
   */
  getRedirectRoute: (intendedRoute: string): string => {
    return ROUTES.AUTH.LOGIN;
  },

  /**
   * Obtient la route par défaut après connexion
   */
  getDefaultRoute: (userRole?: string): string => {
    switch (userRole) {
      case "admin":
        return ROUTES.TABS.MANAGEMENT;
      case "merchant":
        return ROUTES.TABS.COMMERCE;
      case "customer":
      default:
        return ROUTES.TABS.HOME;
    }
  },
};
