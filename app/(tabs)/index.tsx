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
        <View style={styles.searchContainer}>
          <TouchableOpacity
            style={styles.searchBar}
            onPress={() => router.push("/products")}
          >
            <Ionicons name="search-outline" size={20} color="#666" />
            <Text style={styles.searchPlaceholder}>
              Rechercher un produit...
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Bienvenue sur T-Market</Text>
          <Text style={styles.welcomeSubtitle}>
            La plateforme qui connecte fournisseurs et revendeurs
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
          <View style={styles.marketplaceContainer}>
            <Text style={styles.marketplaceTitle}>
              T-Market: Votre Plateforme B2B
            </Text>
            <Text style={styles.marketplaceDescription}>
              T-Market facilite les échanges commerciaux entre fournisseurs et
              revendeurs. Trouvez des produits de qualité, négociez directement
              et développez votre activité.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Ionicons name="bar-chart-outline" size={24} color="#FF2A2A" />
              <Text style={styles.statValue}>1.2M FCFA</Text>
              <Text style={styles.statLabel}>Ventes du mois</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="cart-outline" size={24} color="#FF2A2A" />
              <Text style={styles.statValue}>24</Text>
              <Text style={styles.statLabel}>Commandes</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="trending-up-outline" size={24} color="#FF2A2A" />
              <Text style={styles.statValue}>+15%</Text>
              <Text style={styles.statLabel}>Croissance</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Produits en Vedette</Text>
            <TouchableOpacity onPress={() => router.push("/products")}>
              <Text style={styles.seeAllText}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.featuredProductsContainer}
          >
            {/* Produit en vedette 1 */}
            <TouchableOpacity
              style={styles.featuredProductCard}
              onPress={() => router.push("/product/1")}
            >
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>-15%</Text>
              </View>
              <View style={styles.featuredImageContainer}>
                <Ionicons
                  name="phone-portrait-outline"
                  size={48}
                  color="#333"
                />
              </View>
              <Text style={styles.featuredProductName}>Smartphone XYZ</Text>
              <Text style={styles.featuredProductPrice}>459 000 FCFA</Text>
              <Text style={styles.featuredProductOriginalPrice}>
                540 000 FCFA
              </Text>
            </TouchableOpacity>

            {/* Produit en vedette 2 */}
            <TouchableOpacity
              style={styles.featuredProductCard}
              onPress={() => router.push("/product/3")}
            >
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>-20%</Text>
              </View>
              <View style={styles.featuredImageContainer}>
                <Ionicons name="shirt-outline" size={48} color="#333" />
              </View>
              <Text style={styles.featuredProductName}>T-shirt Premium</Text>
              <Text style={styles.featuredProductPrice}>19 700 FCFA</Text>
              <Text style={styles.featuredProductOriginalPrice}>
                24 600 FCFA
              </Text>
            </TouchableOpacity>

            {/* Produit en vedette 3 */}
            <TouchableOpacity
              style={styles.featuredProductCard}
              onPress={() => router.push("/product/2")}
            >
              <View style={styles.newBadge}>
                <Text style={styles.newBadgeText}>Nouveau</Text>
              </View>
              <View style={styles.featuredImageContainer}>
                <Ionicons name="laptop-outline" size={48} color="#333" />
              </View>
              <Text style={styles.featuredProductName}>
                Ordinateur Portable Pro
              </Text>
              <Text style={styles.featuredProductPrice}>852 000 FCFA</Text>
            </TouchableOpacity>
          </ScrollView>
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
              <Text style={styles.featureDescription}>Gérez vos produits</Text>
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
  searchContainer: {
    padding: 16,
    paddingBottom: 0,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  searchPlaceholder: {
    marginLeft: 8,
    color: "#999",
    fontSize: 14,
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
  marketplaceContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  marketplaceTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  marketplaceDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statCard: {
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
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
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
  featuredProductsContainer: {
    marginBottom: 10,
  },
  featuredProductCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginRight: 16,
    width: 180,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    position: "relative",
  },
  discountBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#FF2A2A",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    zIndex: 1,
  },
  discountText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  newBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    zIndex: 1,
  },
  newBadgeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  featuredImageContainer: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  featuredProductName: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  featuredProductPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF2A2A",
  },
  featuredProductOriginalPrice: {
    fontSize: 12,
    color: "#999",
    textDecorationLine: "line-through",
    marginTop: 2,
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
