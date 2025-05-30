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

interface CommerceOption {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
  color: string;
}

const commerceOptions: CommerceOption[] = [
  {
    id: "products",
    title: "Produits",
    description: "Gérer le catalogue de produits",
    icon: "pricetag-outline",
    route: "/commerce/products",
    color: "#4CAF50",
  },
  {
    id: "categories",
    title: "Catégories",
    description: "Organiser les catégories de produits",
    icon: "grid-outline",
    route: "/commerce/categories",
    color: "#2196F3",
  },
];

export default function CommerceScreen() {
  const router = useRouter();

  const handleOptionPress = (route: string) => {
    router.push(route as any);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title="Commerce" showCartButton />
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Gestion Commerciale</Text>
          <Text style={styles.subtitle}>
            Gérez vos produits et catégories efficacement
          </Text>
        </View>

        <View style={styles.optionsContainer}>
          {commerceOptions.map((option) => (
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
});
