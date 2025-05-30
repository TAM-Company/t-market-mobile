import { useRouter } from "expo-router";
import { NavigationUtils, RouteMiddleware, ROUTES } from "../config/routes";

/**
 * Hook personnalisé pour la navigation avec validation et sécurité
 */
export const useAppNavigation = () => {
  const router = useRouter();
  // const { isAuthenticated, user } = useAuth(); // Décommenter quand AuthContext sera créé
  const isAuthenticated = true; // Temporaire
  const user = { role: "customer" }; // Temporaire

  /**
   * Navigation sécurisée avec vérification des permissions
   */
  const navigateTo = (
    route: string,
    options?: { replace?: boolean; params?: Record<string, any> }
  ) => {
    try {
      // Vérifier si l'utilisateur peut accéder à cette route
      if (!RouteMiddleware.canAccess(route, isAuthenticated)) {
        const redirectRoute = RouteMiddleware.getRedirectRoute(route);
        console.warn(
          `Accès refusé à ${route}, redirection vers ${redirectRoute}`
        );

        if (options?.replace) {
          router.replace(redirectRoute as any);
        } else {
          router.push(redirectRoute as any);
        }
        return;
      }

      // Construire la route avec les paramètres si fournis
      let finalRoute = route;
      if (options?.params) {
        finalRoute = NavigationUtils.buildRoute(route, options.params);
      }

      // Naviguer vers la route
      if (options?.replace) {
        router.replace(finalRoute as any);
      } else {
        router.push(finalRoute as any);
      }

      console.log(`Navigation vers: ${finalRoute}`);
    } catch (error) {
      console.error("Erreur lors de la navigation:", error);
      // Fallback vers la page d'accueil
      router.push(ROUTES.TABS.HOME as any);
    }
  };

  /**
   * Navigation vers une route de produit
   */
  const navigateToProduct = (productId: string | number) => {
    navigateTo(ROUTES.PRODUCTS.DETAIL(productId));
  };

  /**
   * Navigation vers une route de catégorie
   */
  const navigateToCategory = (categoryId: string | number) => {
    navigateTo(ROUTES.CATEGORIES.DETAIL(categoryId));
  };

  /**
   * Navigation vers une route de sous-catégorie
   */
  const navigateToSubcategory = (subcategoryId: string | number) => {
    navigateTo(ROUTES.CATEGORIES.SUBCATEGORY(subcategoryId));
  };

  /**
   * Navigation vers une route de boutique
   */
  const navigateToShop = (shopId: string | number) => {
    navigateTo(ROUTES.SHOPS.DETAIL(shopId));
  };

  /**
   * Navigation vers une commande spécifique
   */
  const navigateToOrder = (orderId: string) => {
    navigateTo(ROUTES.CUSTOMER.ORDER_DETAIL(orderId));
  };

  /**
   * Navigation vers le panier
   */
  const navigateToCart = () => {
    navigateTo(ROUTES.CUSTOMER.CART);
  };

  /**
   * Navigation vers les notifications
   */
  const navigateToNotifications = () => {
    navigateTo(ROUTES.UTILS.NOTIFICATIONS);
  };

  /**
   * Navigation vers l'aide
   */
  const navigateToHelp = () => {
    navigateTo(ROUTES.UTILS.HELP);
  };

  /**
   * Navigation de retour
   */
  const goBack = () => {
    try {
      router.back();
    } catch (error) {
      console.error("Erreur lors du retour:", error);
      // Fallback vers la page d'accueil
      router.push(ROUTES.TABS.HOME as any);
    }
  };

  /**
   * Navigation vers la page d'accueil appropriée selon le rôle
   */
  const navigateToHome = () => {
    const defaultRoute = RouteMiddleware.getDefaultRoute(user?.role);
    navigateTo(defaultRoute, { replace: true });
  };

  /**
   * Navigation vers la connexion
   */
  const navigateToLogin = () => {
    navigateTo(ROUTES.AUTH.LOGIN, { replace: true });
  };

  /**
   * Navigation vers l'inscription
   */
  const navigateToRegister = () => {
    navigateTo(ROUTES.AUTH.REGISTER);
  };

  /**
   * Navigation vers une méthode de paiement
   */
  const navigateToPayment = (method?: string) => {
    if (!method) {
      navigateTo(ROUTES.PAYMENT.INDEX);
      return;
    }

    const paymentRoutes: Record<string, string> = {
      "cash-delivery": ROUTES.PAYMENT.CASH_DELIVERY,
      "mtn-momo": ROUTES.PAYMENT.MTN_MOMO,
      "orange-money": ROUTES.PAYMENT.ORANGE_MONEY,
      "moov-flooz": ROUTES.PAYMENT.MOOV_FLOOZ,
      "wave-ci": ROUTES.PAYMENT.WAVE_CI,
    };

    const route = paymentRoutes[method] || ROUTES.PAYMENT.INDEX;
    navigateTo(route);
  };

  /**
   * Navigation avec données (pour les notifications par exemple)
   */
  const navigateWithData = (route: string, data?: Record<string, any>) => {
    try {
      if (data) {
        router.push({
          pathname: route as any,
          params: data,
        });
      } else {
        navigateTo(route);
      }
    } catch (error) {
      console.error("Erreur lors de la navigation avec données:", error);
      navigateTo(route);
    }
  };

  /**
   * Vérification si on peut naviguer vers une route
   */
  const canNavigateTo = (route: string): boolean => {
    return RouteMiddleware.canAccess(route, isAuthenticated);
  };

  /**
   * Obtention de la route actuelle
   */
  const getCurrentRoute = (): string => {
    // Cette fonction nécessiterait l'accès au state de navigation
    // Pour l'instant, on retourne une chaîne vide
    return "";
  };

  return {
    // Navigation de base
    navigateTo,
    goBack,
    navigateToHome,

    // Navigation spécialisée
    navigateToProduct,
    navigateToCategory,
    navigateToSubcategory,
    navigateToShop,
    navigateToOrder,
    navigateToCart,
    navigateToNotifications,
    navigateToHelp,

    // Authentification
    navigateToLogin,
    navigateToRegister,

    // Paiement
    navigateToPayment,

    // Navigation avancée
    navigateWithData,

    // Utilitaires
    canNavigateTo,
    getCurrentRoute,

    // Accès direct aux routes
    routes: ROUTES,
  };
};

/**
 * Hook simplifié pour la navigation rapide
 */
export const useQuickNavigation = () => {
  const {
    navigateToProduct,
    navigateToCategory,
    navigateToCart,
    navigateToNotifications,
    goBack,
  } = useAppNavigation();

  return {
    toProduct: navigateToProduct,
    toCategory: navigateToCategory,
    toCart: navigateToCart,
    toNotifications: navigateToNotifications,
    back: goBack,
  };
};

/**
 * Types pour TypeScript
 */
export type NavigationHook = ReturnType<typeof useAppNavigation>;
export type QuickNavigationHook = ReturnType<typeof useQuickNavigation>;
