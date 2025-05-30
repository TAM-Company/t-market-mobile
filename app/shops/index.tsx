import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Shop } from "../../src/types";

// Données mockées pour les boutiques
const mockShops: Shop[] = [
  {
    id: "shop1",
    name: "Épicerie Moderne",
    description:
      "Votre épicerie de quartier avec des produits frais et de qualité",
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
      address: "Cocody, Riviera 3",
      city: "Abidjan",
    },
    contact: {
      phone: "+225 07 12 34 56 78",
      whatsapp: "+225 07 12 34 56 78",
    },
    deliveryInfo: {
      zones: ["Cocody", "Marcory"],
      minOrder: 5000,
      deliveryFee: 1000,
      freeDeliveryThreshold: 25000,
    },
  },
  {
    id: "shop2",
    name: "Tech Store CI",
    description: "Smartphones, ordinateurs et accessoires high-tech",
    banner:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
    logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200",
    supplierId: "supplier2",
    categories: ["cat3", "cat4"],
    products: ["prod3", "prod4"],
    isActive: true,
    createdAt: "2024-01-05",
    updatedAt: "2024-01-14",
    rating: 4.8,
    reviewCount: 89,
    followers: 890,
    location: {
      address: "Plateau, Rue du Commerce",
      city: "Abidjan",
    },
    contact: {
      phone: "+225 05 98 76 54 32",
      email: "contact@techstore.ci",
    },
    deliveryInfo: {
      zones: ["Plateau", "Treichville", "Adjamé"],
      minOrder: 10000,
      deliveryFee: 2000,
      freeDeliveryThreshold: 50000,
    },
  },
  {
    id: "shop3",
    name: "Mode & Style",
    description: "Vêtements tendance pour homme, femme et enfant",
    banner:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800",
    logo: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=200",
    supplierId: "supplier3",
    categories: ["cat5", "cat6"],
    products: ["prod5", "prod6"],
    isActive: true,
    createdAt: "2024-01-10",
    updatedAt: "2024-01-13",
    rating: 4.2,
    reviewCount: 156,
    followers: 2100,
    location: {
      address: "Yopougon, Marché",
      city: "Abidjan",
    },
    contact: {
      phone: "+225 01 23 45 67 89",
    },
    deliveryInfo: {
      zones: ["Yopougon", "Abobo"],
      minOrder: 8000,
      deliveryFee: 1500,
      freeDeliveryThreshold: 30000,
    },
  },
];

type FilterType = "all" | "food" | "tech" | "fashion" | "local";

export default function ShopsScreen() {
  const [shops, setShops] = useState<Shop[]>(mockShops);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filters = [
    { key: "all" as FilterType, label: "Toutes", icon: "grid" },
    { key: "food" as FilterType, label: "Alimentation", icon: "restaurant" },
    { key: "tech" as FilterType, label: "Tech", icon: "phone-portrait" },
    { key: "fashion" as FilterType, label: "Mode", icon: "shirt" },
    { key: "local" as FilterType, label: "Local", icon: "location" },
  ];

  const getFilteredShops = () => {
    let filtered = shops;

    if (searchQuery) {
      filtered = filtered.filter(
        (shop) =>
          shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          shop.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          shop.location?.city.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtrage par catégorie (simulation)
    if (selectedFilter !== "all") {
      // Ici, vous pourriez filtrer par catégories réelles
      // Pour la démo, on garde toutes les boutiques
    }

    return filtered.sort((a, b) => b.rating - a.rating);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulation du rechargement
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const renderShopCard = ({ item }: { item: Shop }) => (
    <TouchableOpacity
      style={styles.shopCard}
      onPress={() => router.push(`/shops/${item.id}`)}
    >
      <View style={styles.shopBanner}>
        <Image source={{ uri: item.banner }} style={styles.bannerImage} />
        <View style={styles.shopLogo}>
          <Image source={{ uri: item.logo }} style={styles.logoImage} />
        </View>
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={12} color="#FFD700" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>

      <View style={styles.shopInfo}>
        <Text style={styles.shopName}>{item.name}</Text>
        <Text style={styles.shopDescription} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.shopMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="location-outline" size={14} color="#666" />
            <Text style={styles.metaText}>{item.location?.address}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="people-outline" size={14} color="#666" />
            <Text style={styles.metaText}>{item.followers} abonnés</Text>
          </View>
        </View>

        <View style={styles.deliveryInfo}>
          <View style={styles.deliveryItem}>
            <Text style={styles.deliveryLabel}>Livraison:</Text>
            <Text style={styles.deliveryValue}>
              {item.deliveryInfo?.deliveryFee} FCFA
            </Text>
          </View>
          <View style={styles.deliveryItem}>
            <Text style={styles.deliveryLabel}>Min:</Text>
            <Text style={styles.deliveryValue}>
              {item.deliveryInfo?.minOrder} FCFA
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const filteredShops = getFilteredShops();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Boutiques</Text>
        <Text style={styles.headerSubtitle}>
          {filteredShops.length} boutiques disponibles
        </Text>
      </View>

      {/* Barre de recherche */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#666"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher une boutique..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => setSearchQuery("")}
          >
            <Ionicons name="close-circle" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      {/* Filtres */}
      <View style={styles.filtersContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={filters}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedFilter === item.key && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedFilter(item.key)}
            >
              <Ionicons
                name={item.icon as any}
                size={16}
                color={selectedFilter === item.key ? "#fff" : "#666"}
              />
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === item.key && styles.filterTextActive,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.filtersList}
        />
      </View>

      {/* Liste des boutiques */}
      <FlatList
        data={filteredShops}
        keyExtractor={(item) => item.id}
        renderItem={renderShopCard}
        contentContainerStyle={styles.shopsList}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="storefront-outline" size={64} color="#ccc" />
            <Text style={styles.emptyTitle}>Aucune boutique trouvée</Text>
            <Text style={styles.emptyMessage}>
              Essayez de modifier vos critères de recherche
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    backgroundColor: "#fff",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 12,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: "#333",
  },
  clearButton: {
    padding: 4,
  },
  filtersContainer: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  filtersList: {
    paddingHorizontal: 16,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: "#FF2A2A",
  },
  filterText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 6,
  },
  filterTextActive: {
    color: "#fff",
  },
  shopsList: {
    padding: 16,
  },
  shopCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  shopBanner: {
    height: 120,
    position: "relative",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  shopLogo: {
    position: "absolute",
    bottom: -20,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
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
    borderRadius: 18,
    resizeMode: "cover",
  },
  ratingBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 4,
  },
  shopInfo: {
    padding: 16,
    paddingTop: 24,
  },
  shopName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  shopDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 12,
  },
  shopMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  metaText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  deliveryInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  deliveryItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  deliveryLabel: {
    fontSize: 12,
    color: "#666",
    marginRight: 4,
  },
  deliveryValue: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FF2A2A",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 64,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 32,
  },
});
