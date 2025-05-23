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
import { CategoryCard } from "../../src/components/CategoryCard";
import { Header } from "../../src/components/Header";
import { categories } from "../../src/data/mockData";

export default function HomeScreen() {
  const router = useRouter();

  const navigateToAllProducts = () => {
    router.push("/products");
  };

  const navigateToCategory = (categoryId: string) => {
    router.push(`/category/${categoryId}`);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Header title="T-Market" showCartButton />
      <ScrollView style={styles.container}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Bienvenue sur T-Market</Text>
          <Text style={styles.welcomeSubtitle}>
            Découvrez nos produits de qualité
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Catégories</Text>
            <TouchableOpacity onPress={() => router.push("/categories")}>
              <Text style={styles.seeAllText}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.categoriesContainer}>
            {categories.slice(0, 4).map((category) => (
              <View key={category.id} style={styles.categoryCardWrapper}>
                <TouchableOpacity
                  onPress={() => navigateToCategory(category.id)}
                >
                  <CategoryCard category={category} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Fonctionnalités</Text>
          </View>
          <View style={styles.featuresContainer}>
            <TouchableOpacity
              style={styles.featureCard}
              onPress={() => router.push("/products")}
            >
              <Ionicons name="grid-outline" size={32} color="#FF2A2A" />
              <Text style={styles.featureTitle}>Catalogue</Text>
              <Text style={styles.featureDescription}>
                Parcourez tous nos produits
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.featureCard}
              onPress={() => router.push("/cart")}
            >
              <Ionicons name="cart-outline" size={32} color="#FF2A2A" />
              <Text style={styles.featureTitle}>Panier</Text>
              <Text style={styles.featureDescription}>Gérez vos achats</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.featureCard}
              onPress={() => router.push("/inventory")}
            >
              <Ionicons name="cube-outline" size={32} color="#FF2A2A" />
              <Text style={styles.featureTitle}>Stock</Text>
              <Text style={styles.featureDescription}>
                Gérez votre inventaire
              </Text>
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
    backgroundColor: "#f8f8f8",
  },
  welcomeSection: {
    backgroundColor: "#FF2A2A",
    padding: 20,
    paddingTop: 40,
    paddingBottom: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
  },
  section: {
    padding: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  seeAllText: {
    color: "#FF2A2A",
    fontWeight: "600",
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryCardWrapper: {
    width: "48%",
    marginBottom: 16,
  },
  featuresContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  featureCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    width: "31%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
    marginBottom: 4,
    textAlign: "center",
  },
  featureDescription: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
});
