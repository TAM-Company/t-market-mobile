import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";
import { CategoryCarousel } from "../components/ui/CategoryCard";
import { LayoutWithHeader } from "../components/layout/Layout";
import { ProductCard, ProductGrid } from "../components/ui/ProductCard";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { SearchBar } from "../components/ui/SearchBar";
import { useThemedStyles } from "../context/ThemeContext";
import { Theme } from "../design/theme";
import { useAppNavigation } from "../hooks/useNavigation";
import { Category, Product } from "../types";

const { width: screenWidth } = Dimensions.get("window");

// Données mock - à remplacer par des appels API
const mockCategories: Category[] = [
  {
    id: "1",
    name: "Électronique",
    slug: "electronics",
    icon: "phone-portrait-outline",
    productCount: 156,
  },
  {
    id: "2",
    name: "Mode",
    slug: "fashion",
    icon: "shirt-outline",
    productCount: 89,
  },
  {
    id: "3",
    name: "Maison",
    slug: "home",
    icon: "home-outline",
    productCount: 234,
  },
  {
    id: "4",
    name: "Sport",
    slug: "sports",
    icon: "fitness-outline",
    productCount: 67,
  },
];

const mockProducts: Product[] = [
  {
    id: "1",
    name: "iPhone 15 Pro",
    description: "Le dernier iPhone avec puce A17 Pro",
    price: 1199,
    originalPrice: 1299,
    image: "https://via.placeholder.com/300x300",
    rating: 4.8,
    reviewCount: 1250,
    stock: 15,
    categoryId: "1",
    supplierId: "1",
  },
  {
    id: "2",
    name: "MacBook Air M3",
    description: "Ordinateur portable ultra-fin avec puce M3",
    price: 1299,
    image: "https://via.placeholder.com/300x300",
    rating: 4.9,
    reviewCount: 890,
    stock: 8,
    categoryId: "1",
    supplierId: "1",
  },
  {
    id: "3",
    name: "Nike Air Max",
    description: "Chaussures de sport confortables",
    price: 129,
    originalPrice: 159,
    image: "https://via.placeholder.com/300x300",
    rating: 4.6,
    reviewCount: 456,
    stock: 25,
    categoryId: "4",
    supplierId: "2",
  },
  {
    id: "4",
    name: "Samsung Galaxy S24",
    description: "Smartphone Android haut de gamme",
    price: 899,
    image: "https://via.placeholder.com/300x300",
    rating: 4.7,
    reviewCount: 678,
    stock: 12,
    categoryId: "1",
    supplierId: "3",
  },
];

export const HomeScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const { navigateToSearch, navigateToProduct, navigateToCategory } =
    useAppNavigation();
  const styles = useThemedStyles(createStyles);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Simuler le chargement des données
      setCategories(mockCategories);
      setFeaturedProducts(mockProducts.slice(0, 2));
      setPopularProducts(mockProducts);
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigateToSearch({ query });
    }
  };

  const handleSearchFocus = () => {
    navigateToSearch();
  };

  return (
    <LayoutWithHeader
      headerTitle="T-Market"
      showCartButton
      scrollable
      refreshing={refreshing}
      onRefresh={handleRefresh}
      padding="none"
    >
      {/* Barre de recherche */}
      <View style={styles.searchContainer}>
        <SearchBar
          value={searchQuery}
          placeholder="Rechercher des produits..."
          onChangeText={setSearchQuery}
          onSubmit={handleSearch}
          onFocus={handleSearchFocus}
          showFilterButton
          onFilterPress={() => navigateToSearch({ showFilters: true })}
        />
      </View>

      {/* Bannière promotionnelle */}
      <View style={styles.bannerContainer}>
        <Card style={styles.banner} variant="filled">
          <View style={styles.bannerContent}>
            <View style={styles.bannerText}>
              <Text style={styles.bannerTitle}>Offres Spéciales</Text>
              <Text style={styles.bannerSubtitle}>
                Jusqu'à 50% de réduction sur une sélection de produits
              </Text>
              <Button
                variant="primary"
                size="sm"
                style={styles.bannerButton}
                onPress={() => navigateToSearch({ category: "promotions" })}
              >
                Voir les offres
              </Button>
            </View>
          </View>
        </Card>
      </View>

      {/* Catégories */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Catégories</Text>
          <Button
            variant="ghost"
            size="sm"
            onPress={() => navigateToSearch({ showCategories: true })}
          >
            Voir tout
          </Button>
        </View>
        <CategoryCarousel
          categories={categories}
          onCategoryPress={(category) => navigateToCategory(category.id)}
        />
      </View>

      {/* Produits en vedette */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Produits en vedette</Text>
          <Button
            variant="ghost"
            size="sm"
            onPress={() => navigateToSearch({ featured: true })}
          >
            Voir tout
          </Button>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScroll}
        >
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              variant="featured"
              size="lg"
              onPress={(product) => navigateToProduct(product.id)}
              style={styles.featuredProduct}
            />
          ))}
        </ScrollView>
      </View>

      {/* Produits populaires */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Produits populaires</Text>
          <Button
            variant="ghost"
            size="sm"
            onPress={() => navigateToSearch({ popular: true })}
          >
            Voir tout
          </Button>
        </View>
        <ProductGrid
          products={popularProducts}
          numColumns={2}
          onProductPress={(product) => navigateToProduct(product.id)}
        />
      </View>

      {/* Recommandations personnalisées */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommandé pour vous</Text>
        </View>
        <Text style={styles.sectionDescription}>
          Basé sur vos achats précédents et vos préférences
        </Text>
        <ProductGrid
          products={mockProducts.slice(0, 4)}
          numColumns={2}
          onProductPress={(product) => navigateToProduct(product.id)}
        />
      </View>

      {/* Boutiques partenaires */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nos boutiques partenaires</Text>
          <Button
            variant="ghost"
            size="sm"
            onPress={() => navigateToSearch({ showShops: true })}
          >
            Voir tout
          </Button>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScroll}
        >
          {/* Ici on afficherait les cartes de boutiques */}
          <Card style={styles.shopCard}>
            <Text style={styles.shopName}>TechStore</Text>
            <Text style={styles.shopDescription}>Électronique et gadgets</Text>
          </Card>
          <Card style={styles.shopCard}>
            <Text style={styles.shopName}>FashionHub</Text>
            <Text style={styles.shopDescription}>Mode et accessoires</Text>
          </Card>
        </ScrollView>
      </View>

      {/* Espacement en bas */}
      <View style={styles.bottomSpacing} />
    </LayoutWithHeader>
  );
};

const createStyles = (theme: Theme) => ({
  // Recherche
  searchContainer: {
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[3],
    backgroundColor: theme.colors.background.primary,
  },

  // Bannière
  bannerContainer: {
    paddingHorizontal: theme.spacing[4],
    marginBottom: theme.spacing[4],
  },

  banner: {
    backgroundColor: theme.colors.primary[500],
    minHeight: 120,
  },

  bannerContent: {
    flex: 1,
    padding: theme.spacing[4],
    justifyContent: "center" as const,
  },

  bannerText: {
    flex: 1,
  },

  bannerTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.inverse,
    marginBottom: theme.spacing[2],
  },

  bannerSubtitle: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.inverse,
    marginBottom: theme.spacing[4],
    opacity: 0.9,
  },

  bannerButton: {
    alignSelf: "flex-start" as const,
    backgroundColor: theme.colors.background.primary,
  },

  // Sections
  section: {
    marginBottom: theme.spacing[6],
  },

  sectionHeader: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    alignItems: "center" as const,
    paddingHorizontal: theme.spacing[4],
    marginBottom: theme.spacing[4],
  },

  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
  },

  sectionDescription: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    paddingHorizontal: theme.spacing[4],
    marginBottom: theme.spacing[4],
  },

  // Scroll horizontal
  horizontalScroll: {
    paddingHorizontal: theme.spacing[4],
  },

  // Produits en vedette
  featuredProduct: {
    width: screenWidth * 0.7,
    marginRight: theme.spacing[4],
  },

  // Boutiques
  shopCard: {
    width: 150,
    height: 100,
    marginRight: theme.spacing[4],
    padding: theme.spacing[3],
    justifyContent: "center" as const,
  },

  shopName: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[1],
  },

  shopDescription: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  },

  // Espacement
  bottomSpacing: {
    height: theme.spacing[8],
  },
});
