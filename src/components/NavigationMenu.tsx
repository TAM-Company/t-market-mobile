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
import { useThemedStyles } from "../context/ThemeContext";
import { Theme } from "../design/theme";

interface NavigationItemData {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
  colorToken: keyof Theme["colors"]["primary"]; // Use theme color token
}

// It's better to define colors via theme rather than hardcoding them here.
// For this refactor, we'll assume a primary color is used.
// This part might need further adjustment based on actual design requirements.
const navigationItems: NavigationItemData[] = [
  {
    id: "home",
    title: "Accueil",
    icon: "home-outline",
    colorToken: "500", // Example token
    route: ROUTES.TABS.HOME,
  },
  {
    id: "products",
    title: "Produits",
    icon: "grid-outline",
    colorToken: "500",
    route: ROUTES.PRODUCTS.LIST,
  },
  {
    id: "categories",
    title: "Catégories",
    icon: "list-outline",
    colorToken: "500",
    route: ROUTES.CATEGORIES.LIST,
  },
  {
    id: "cart",
    title: "Panier",
    icon: "cart-outline",
    colorToken: "500",
    route: ROUTES.CUSTOMER.CART,
  },
  {
    id: "notifications",
    title: "Notifications",
    icon: "notifications-outline",
    colorToken: "500",
    route: ROUTES.UTILS.NOTIFICATIONS,
  },
  {
    id: "help",
    title: "Aide",
    icon: "help-circle-outline",
    colorToken: "500",
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
  const styles = useThemedStyles(createStyles);
  const { navigateTo } = useAppNavigation();

  const handleNavigation = (route: string) => {
    navigateTo(route);
  };

  const renderNavigationItem = (item: NavigationItemData, theme: Theme) => {
    const itemColor = theme.colors.primary[item.colorToken] || theme.colors.primary[500];
    // Ensure itemColor is a string. If colorToken is invalid, default to a known primary color.

    return (
      <TouchableOpacity
        key={item.id}
        style={[
          styles.navItem,
          horizontal ? styles.navItemHorizontal : styles.navItemVertical,
        ]}
        onPress={() => handleNavigation(item.route)}
      >
        <View
          style={[
            styles.iconContainer,
            // Applying alpha to the theme color for background
            { backgroundColor: `${itemColor}20` }, // e.g., '20' for approx 12% opacity
          ]}
        >
          <Ionicons name={item.icon} size={24} color={itemColor} />
        </View>
        {showLabels && (
          <Text style={[styles.navLabel, { color: itemColor }]}>
            {item.title}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  // We need the theme object to pass to renderNavigationItem for color processing
  // This is a bit of a workaround because useThemedStyles is typically used for the styles object itself.
  // A more ideal approach might involve a ThemeProvider context directly or passing theme explicitly.
  // For now, we'll call useThemedStyles once and pass its theme object.
  // This assumes createStyles doesn't actually *need* the theme for the initial style creation
  // if all theme-dependent parts are handled dynamically in renderNavigationItem or via style props.
  // However, the styles object *is* dependent on the theme, so this is fine.

  return (
    <>
      {horizontal ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalContainer}
        >
          {navigationItems.map((item) => renderNavigationItem(item, styles.theme))}
        </ScrollView>
      ) : (
        <View style={styles.verticalContainer}>
          {navigationItems.map((item) => renderNavigationItem(item, styles.theme))}
        </View>
      )}
    </>
  );
};

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    horizontalContainer: {
      paddingHorizontal: theme.spacing[4], // Updated
      gap: theme.spacing[3], // Updated
    },
    verticalContainer: {
      padding: theme.spacing[4], // Updated
      gap: theme.spacing[3], // Updated
    },
    navItem: {
      alignItems: "center",
      justifyContent: "center",
    },
    navItemHorizontal: {
      width: 80, // This could be theme-dependent if needed
    },
    navItemVertical: {
      flexDirection: "row",
      width: "100%",
      paddingVertical: theme.spacing[3], // Updated
      paddingHorizontal: theme.spacing[4], // Updated
      backgroundColor: theme.colors.background.card, // Updated
      borderRadius: theme.borderRadius.lg, // Updated
      elevation: 2, // Consider using theme.shadows
      shadowColor: theme.colors.shadow.default, // Updated
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    iconContainer: {
      width: 48, // Could be theme-dependent
      height: 48, // Could be theme-dependent
      borderRadius: 24, // Could be theme-dependent (half of width/height)
      justifyContent: "center",
      alignItems: "center",
      marginBottom: theme.spacing[2], // Updated
    },
    navLabel: {
      fontSize: theme.typography.fontSize.xs, // Updated
      fontWeight: theme.typography.fontWeight.medium, // Updated
      textAlign: "center",
    },
  });
  // Attach theme to styles object for access in component
  // This is a common pattern when the theme object itself is needed for dynamic styling inside the component
  return { ...styles, theme };
};
