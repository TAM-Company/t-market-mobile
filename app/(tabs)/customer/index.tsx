import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../../../src/components/Header";
import { useCart } from "../../../src/context/CartContext";

interface CustomerOption {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
  color: string;
  badge?: number;
}

export default function CustomerScreen() {
  const router = useRouter();
  const { getCartItemsCount } = useCart();
  const cartItemsCount = getCartItemsCount();

  const customerOptions: CustomerOption[] = [
    {
      id: "cart",
      title: "Mon Panier",
      description: "Voir les articles dans votre panier",
      icon: "cart-outline",
      route: "/panier",
      color: "#FF2A2A",
      badge: cartItemsCount,
    },
    {
      id: "profile",
      title: "Mon Profil",
      description: "Gérer vos informations personnelles",
      icon: "person-outline",
      route: "/customer/profile",
      color: "#2196F3",
    },
  ];

  const handleOptionPress = (route: string) => {
    router.push(route as any);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title="Espace Client" showCartButton />
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Bienvenue dans votre espace</Text>
          <Text style={styles.subtitle}>
            Gérez votre panier et vos informations personnelles
          </Text>
        </View>

        <View style={styles.optionsContainer}>
          {customerOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[styles.optionCard, { borderLeftColor: option.color }]}
              onPress={() => handleOptionPress(option.route)}
            >
              <View style={styles.optionContent}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: option.color },
                  ]}
                >
                  <Ionicons name={option.icon as any} size={24} color="#fff" />
                  {option.badge && option.badge > 0 && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{option.badge}</Text>
                    </View>
                  )}
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.optionTitle}>{option.title}</Text>
                  <Text style={styles.optionDescription}>
                    {option.description}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#ccc" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Actions Rapides</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => router.push("/shops")}
            >
              <Ionicons name="storefront-outline" size={32} color="#FF2A2A" />
              <Text style={styles.quickActionText}>Boutiques</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => router.push("/")}
            >
              <Ionicons name="home-outline" size={32} color="#4CAF50" />
              <Text style={styles.quickActionText}>Accueil</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    padding: 20,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    lineHeight: 22,
  },
  optionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  optionCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#fff",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FF2A2A",
  },
  badgeText: {
    color: "#FF2A2A",
    fontSize: 12,
    fontWeight: "bold",
  },
  textContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  quickActions: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quickActionCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    flex: 0.48,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  quickActionText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
});
