import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ROUTES } from "../config/routes";
import { useAppNavigation } from "../hooks/useNavigation";

interface NavigationItem {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
  color: string;
}

const navigationItems: NavigationItem[] = [
  {
    id: "home",
    title: "Accueil",
    icon: "home-outline",
    color: "#FF2A2A",
    route: ROUTES.TABS.HOME,
  },
  {
    id: "products",
    title: "Produits",
    icon: "grid-outline",
    color: "#FF2A2A",
    route: ROUTES.PRODUCTS.LIST,
  },
  {
    id: "categories",
    title: "Catégories",
    icon: "list-outline",
    color: "#FF2A2A",
    route: ROUTES.CATEGORIES.LIST,
  },
  {
    id: "cart",
    title: "Panier",
    icon: "cart-outline",
    color: "#FF2A2A",
    route: ROUTES.CUSTOMER.CART,
  },
  {
    id: "notifications",
    title: "Notifications",
    icon: "notifications-outline",
    color: "#FF2A2A",
    route: ROUTES.UTILS.NOTIFICATIONS,
  },
  {
    id: "help",
    title: "Aide",
    icon: "help-circle-outline",
    color: "#FF2A2A",
    route: ROUTES.UTILS.HELP,
  },
];

interface NavigationMenuProps {
  horizontal?: boolean;
  showLabels?: boolean;
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({
  horizontal = false,
  showLabels = true,
}) => {
  const { navigateTo } = useAppNavigation();

  const handleNavigation = (route: string) => {
    navigateTo(route);
  };

  const renderNavigationItem = (item: NavigationItem) => (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.navItem,
        horizontal ? styles.navItemHorizontal : styles.navItemVertical,
      ]}
      onPress={() => handleNavigation(item.route)}
    >
      <View
        style={[styles.iconContainer, { backgroundColor: `${item.color}15` }]}
      >
        <Ionicons name={item.icon} size={24} color={item.color} />
      </View>
      {showLabels && (
        <Text style={[styles.navLabel, { color: item.color }]}>
          {item.title}
        </Text>
      )}
    </TouchableOpacity>
  );

  if (horizontal) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalContainer}
      >
        {navigationItems.map(renderNavigationItem)}
      </ScrollView>
    );
  }

  return (
    <View style={styles.verticalContainer}>
      {navigationItems.map(renderNavigationItem)}
    </View>
  );
};

const styles = StyleSheet.create({
  horizontalContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  verticalContainer: {
    padding: 16,
    gap: 12,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  navItemHorizontal: {
    width: 80,
  },
  navItemVertical: {
    flexDirection: "row",
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  navLabel: {
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
  },
});
