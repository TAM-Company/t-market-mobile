import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Category, Product, Shop } from "../../src/types";

// Données mockées
const mockShop: Shop = {
  id: "shop1",
  name: "Épicerie Moderne",
  description:
    "Votre épicerie de quartier avec des produits frais et de qualité. Nous proposons une large gamme de produits alimentaires, des fruits et légumes frais aux produits d'épicerie en passant par les produits locaux.",
  banner: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
  logo: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200",
  supplierId: "supplier1",
  categories: ["cat1", "cat2"],
  products: ["prod1", "prod2"],
  isActive: true,
  createdAt: "2024-01-01",
  updatedAt: "2024-01-15",
  rating: 4.5,
  reviewCount: 128,
  followers: 1250,
  location: {
    address: "Cocody, Riviera 3, Rue des Jardins",
    city: "Abidjan",
    coordinates: {
      latitude: 5.3364,
      longitude: -4.0267,
    },
  },
  contact: {
    phone: "+225 07 12 34 56 78",
    email: "contact@epiceriemoderne.ci",
    whatsapp: "+225 07 12 34 56 78",
  },
  businessHours: {
    open: "07:00",
    close: "20:00",
    days: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
  },
  deliveryInfo: {
    zones: ["Cocody", "Marcory", "Plateau"],
    minOrder: 5000,
    deliveryFee: 1000,
    freeDeliveryThreshold: 25000,
  },
};

const mockCategories: Category[] = [
  {
    id: "cat1",
    name: "Fruits & Légumes",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=300",
    shopId: "shop1",
    productCount: 45,
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "cat2",
    name: "Épicerie",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300",
    shopId: "shop1",
    productCount: 120,
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "cat3",
    name: "Boissons",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300",
    shopId: "shop1",
    productCount: 35,
    isActive: true,
    sortOrder: 3,
  },
  {
    id: "cat4",
    name: "Produits Locaux",
    image: "https://images.unsplash.com/photo-1609501676725-7186f734b2b0?w=300",
    shopId: "shop1",
    productCount: 28,
    isActive: true,
    sortOrder: 4,
  },
];

const mockProducts: Product[] = [
  {
    id: "prod1",
    name: "Riz parfumé 25kg",
    description: "Riz de qualité supérieure, parfait pour tous vos plats",
    price: 15000,
    originalPrice: 18000,
    stock: 50,
    minOrder: 1,
    categoryId: "cat2",
    shopId: "shop1",
    supplierId: "supplier1",
    images: [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400",
    ],
    features: ["Qualité premium", "25kg", "Riz parfumé"],
    specifications: { Poids: "25kg", Origine: "Thaïlande" },
    tags: ["riz", "épicerie", "promotion"],
    isActive: true,
    isFeatured: true,
    isOnSale: true,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-15",
    viewCount: 245,
    orderCount: 89,
    rating: 4.6,
    reviewCount: 23,
  },
  {
    id: "prod2",
    name: "Banane plantain (régime)",
    description: "Bananes plantain fraîches du jour",
    price: 3500,
    stock: 25,
    minOrder: 1,
    categoryId: "cat1",
    shopId: "shop1",
    supplierId: "supplier1",
    images: [
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400",
    ],
    features: ["Frais du jour", "Régime complet", "Local"],
    specifications: { Origine: "Côte d'Ivoire", Fraîcheur: "Du jour" },
    tags: ["banane", "fruits", "local"],
    isActive: true,
    isFeatured: false,
    isOnSale: false,
    createdAt: "2024-01-10",
    updatedAt: "2024-01-15",
    viewCount: 156,
    orderCount: 67,
    rating: 4.8,
    reviewCount: 15,
  },
];

export default function ShopDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [shop] = useState<Shop>(mockShop);
  const [categories] = useState<Category[]>(mockCategories);
  const [products] = useState<Product[]>(mockProducts);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedTab, setSelectedTab] = useState<"products" | "categories">(
    "categories"
  );

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const renderCategoryCard = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() => router.push(`/categories/${item.id}`)}
    >
      <Image source={{ uri: item.image }} style={styles.categoryImage} />
      <View style={styles.categoryInfo}>
        <Text style={styles.categoryName}>{item.name}</Text>
        <Text style={styles.categoryCount}>{item.productCount} produits</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#666" />
    </TouchableOpacity>
  );

  const renderProductCard = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => router.push(`/products/${item.id}`)}
    >
      <View style={styles.productImageContainer}>
        <Image source={{ uri: item.images[0] }} style={styles.productImage} />
        {item.isOnSale && (
          <View style={styles.saleBadge}>
            <Text style={styles.saleText}>PROMO</Text>
          </View>
        )}
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.name}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.currentPrice}>
            {item.price.toLocaleString()} FCFA
          </Text>
          {item.originalPrice && (
            <Text style={styles.originalPrice}>
              {item.originalPrice.toLocaleString()} FCFA
            </Text>
          )}
        </View>
        <View style={styles.productMeta}>
          <View style={styles.rating}>
            <Ionicons name="star" size={12} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <Text style={styles.stock}>Stock: {item.stock}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header avec image de bannière */}
      <View style={styles.header}>
        <Image source={{ uri: shop.banner }} style={styles.bannerImage} />
        <View style={styles.headerOverlay}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="share-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      >
        {/* Informations de la boutique */}
        <View style={styles.shopInfo}>
          <View style={styles.shopHeader}>
            <View style={styles.logoContainer}>
              <Image source={{ uri: shop.logo }} style={styles.logoImage} />
            </View>
            <View style={styles.shopDetails}>
              <Text style={styles.shopName}>{shop.name}</Text>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>{shop.rating}</Text>
                <Text style={styles.reviewCount}>
                  ({shop.reviewCount} avis)
                </Text>
              </View>
              <View style={styles.followersContainer}>
                <Ionicons name="people" size={16} color="#666" />
                <Text style={styles.followersText}>
                  {shop.followers} abonnés
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={[
                styles.followButton,
                isFollowing && styles.followingButton,
              ]}
              onPress={handleFollow}
            >
              <Ionicons
                name={isFollowing ? "checkmark" : "add"}
                size={16}
                color={isFollowing ? "#fff" : "#FF2A2A"}
              />
              <Text
                style={[styles.followText, isFollowing && styles.followingText]}
              >
                {isFollowing ? "Suivi" : "Suivre"}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.shopDescription}>{shop.description}</Text>

          {/* Informations de contact et livraison */}
          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <Ionicons name="location" size={16} color="#666" />
              <Text style={styles.infoText}>{shop.location?.address}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="time" size={16} color="#666" />
              <Text style={styles.infoText}>
                {shop.businessHours?.open} - {shop.businessHours?.close}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="call" size={16} color="#666" />
              <Text style={styles.infoText}>{shop.contact.phone}</Text>
            </View>
          </View>

          {/* Informations de livraison */}
          <View style={styles.deliverySection}>
            <Text style={styles.sectionTitle}>Livraison</Text>
            <View style={styles.deliveryGrid}>
              <View style={styles.deliveryItem}>
                <Text style={styles.deliveryLabel}>Frais de livraison</Text>
                <Text style={styles.deliveryValue}>
                  {shop.deliveryInfo?.deliveryFee} FCFA
                </Text>
              </View>
              <View style={styles.deliveryItem}>
                <Text style={styles.deliveryLabel}>Commande minimum</Text>
                <Text style={styles.deliveryValue}>
                  {shop.deliveryInfo?.minOrder} FCFA
                </Text>
              </View>
              <View style={styles.deliveryItem}>
                <Text style={styles.deliveryLabel}>Livraison gratuite dès</Text>
                <Text style={styles.deliveryValue}>
                  {shop.deliveryInfo?.freeDeliveryThreshold} FCFA
                </Text>
              </View>
            </View>
            <View style={styles.deliveryZones}>
              <Text style={styles.deliveryLabel}>Zones de livraison:</Text>
              <Text style={styles.zonesText}>
                {shop.deliveryInfo?.zones.join(", ")}
              </Text>
            </View>
          </View>
        </View>

        {/* Onglets */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === "categories" && styles.activeTab,
            ]}
            onPress={() => setSelectedTab("categories")}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === "categories" && styles.activeTabText,
              ]}
            >
              Catégories ({categories.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === "products" && styles.activeTab]}
            onPress={() => setSelectedTab("products")}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === "products" && styles.activeTabText,
              ]}
            >
              Produits ({products.length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Contenu des onglets */}
        <View style={styles.tabContent}>
          {selectedTab === "categories" ? (
            <FlatList
              data={categories}
              keyExtractor={(item) => item.id}
              renderItem={renderCategoryCard}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          ) : (
            <FlatList
              data={products}
              keyExtractor={(item) => item.id}
              renderItem={renderProductCard}
              numColumns={2}
              scrollEnabled={false}
              columnWrapperStyle={styles.productRow}
              ItemSeparatorComponent={() => (
                <View style={styles.productSeparator} />
              )}
            />
          )}
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
  header: {
    height: 200,
    position: "relative",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  headerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  shopInfo: {
    backgroundColor: "#fff",
    padding: 16,
    marginTop: -20,
    marginHorizontal: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  shopHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff",
    padding: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  logoImage: {
    width: "100%",
    height: "100%",
    borderRadius: 28,
    resizeMode: "cover",
  },
  shopDetails: {
    flex: 1,
    marginLeft: 12,
  },
  shopName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  followersContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  followersText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  followButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FF2A2A",
    backgroundColor: "#fff",
  },
  followingButton: {
    backgroundColor: "#FF2A2A",
    borderColor: "#FF2A2A",
  },
  followText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF2A2A",
    marginLeft: 4,
  },
  followingText: {
    color: "#fff",
  },
  shopDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 16,
  },
  infoSection: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 8,
    flex: 1,
  },
  deliverySection: {
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  deliveryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  deliveryItem: {
    width: "50%",
    marginBottom: 8,
  },
  deliveryLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 2,
  },
  deliveryValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF2A2A",
  },
  deliveryZones: {
    marginTop: 8,
  },
  zonesText: {
    fontSize: 14,
    color: "#333",
    marginTop: 4,
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: "#FF2A2A",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  activeTabText: {
    color: "#fff",
  },
  tabContent: {
    margin: 16,
  },
  categoryCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: "cover",
  },
  categoryInfo: {
    flex: 1,
    marginLeft: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 14,
    color: "#666",
  },
  separator: {
    height: 12,
  },
  productRow: {
    justifyContent: "space-between",
  },
  productCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  productImageContainer: {
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  saleBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#FF2A2A",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  saleText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#fff",
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    lineHeight: 18,
  },
  priceContainer: {
    marginBottom: 8,
  },
  currentPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF2A2A",
  },
  originalPrice: {
    fontSize: 12,
    color: "#999",
    textDecorationLine: "line-through",
    marginTop: 2,
  },
  productMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  stock: {
    fontSize: 12,
    color: "#666",
  },
  productSeparator: {
    height: 12,
  },
});
