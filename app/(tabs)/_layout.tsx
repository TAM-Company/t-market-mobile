import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { useCart } from "../../src/context/CartContext";
import { useTheme } from "../../src/context/ThemeContext";

export default function TabsLayout() {
  const { getCartItemsCount } = useCart();
  const { theme } = useTheme();
  const cartItemsCount = getCartItemsCount();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary[500],
        tabBarInactiveTintColor: theme.colors.text.tertiary,
        tabBarStyle: {
          backgroundColor: theme.colors.background.primary,
          borderTopWidth: 1,
          borderTopColor: theme.colors.border.light,
          height: Platform.OS === "ios" ? 88 : 64,
          paddingBottom: Platform.OS === "ios" ? 24 : 8,
          paddingTop: 8,
          elevation: 8,
          shadowColor: theme.colors.neutral[900],
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
          fontFamily: theme.typography.fontFamily.primary,
        },
        tabBarIconStyle: {
          marginBottom: 2,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Accueil",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="commerce"
        options={{
          title: "Commerce",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "storefront" : "storefront-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="customer"
        options={{
          title: "Profil",
          tabBarBadge: cartItemsCount > 0 ? cartItemsCount : undefined,
          tabBarBadgeStyle: {
            backgroundColor: theme.colors.status.error,
            color: theme.colors.text.inverse,
            fontSize: 10,
            fontWeight: "bold",
            minWidth: 18,
            height: 18,
            borderRadius: 9,
            marginLeft: 8,
            marginTop: -4,
          },
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="management"
        options={{
          title: "Gestion",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
