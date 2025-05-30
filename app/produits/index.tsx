import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FilterModal } from "../../src/components/FilterModal";
import { Header } from "../../src/components/Header";
import { ProductCard } from "../../src/components/ProductCard";
import { mockProducts } from "../../src/data/mockData";
import { Product } from "../../src/types";

export default function ProduitsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("name");
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const categories = Array.from(
    new Set(mockProducts.map((product) => product.category))
  );

  const filteredProducts = mockProducts
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        !selectedCategory || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const handleProductPress = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <View style={viewMode === "grid" ? styles.gridItem : styles.listItem}>
      <ProductCard
        product={item}
        onPress={() => handleProductPress(item.id)}
        style={viewMode === "list" ? styles.listCard : undefined}
      />
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title="Tous les Produits" showBackButton showCartButton />
      <View style={styles.container}>
        {/* Search and Filter Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={20} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher un produit..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons name="close-circle" size={20} color="#666" />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setIsFilterModalVisible(true)}
          >
            <Ionicons name="options" size={20} color="#FF2A2A" />
          </TouchableOpacity>
        </View>

        {/* Category Filter */}
        <View style={styles.categoryContainer}>
          <TouchableOpacity
            style={[
              styles.categoryChip,
              !selectedCategory && styles.activeCategoryChip,
            ]}
            onPress={() => setSelectedCategory("")}
          >
            <Text
              style={[
                styles.categoryChipText,
                !selectedCategory && styles.activeCategoryChipText,
              ]}
            >
              Tous
            </Text>
          </TouchableOpacity>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.activeCategoryChip,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  selectedCategory === category &&
                    styles.activeCategoryChipText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Results Header */}
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            {filteredProducts.length} produit
            {filteredProducts.length > 1 ? "s" : ""}
            {selectedCategory && ` dans ${selectedCategory}`}
          </Text>
          <View style={styles.viewControls}>
            <TouchableOpacity
              style={[
                styles.viewButton,
                viewMode === "grid" && styles.activeViewButton,
              ]}
              onPress={() => setViewMode("grid")}
            >
              <Ionicons
                name="grid"
                size={18}
                color={viewMode === "grid" ? "#FF2A2A" : "#666"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.viewButton,
                viewMode === "list" && styles.activeViewButton,
              ]}
              onPress={() => setViewMode("list")}
            >
              <Ionicons
                name="list"
                size={18}
                color={viewMode === "list" ? "#FF2A2A" : "#666"}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Products List */}
        {filteredProducts.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="search" size={64} color="#ccc" />
            <Text style={styles.emptyTitle}>Aucun produit trouvé</Text>
            <Text style={styles.emptyMessage}>
              Essayez de modifier vos critères de recherche
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredProducts}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id}
            numColumns={viewMode === "grid" ? 2 : 1}
            key={viewMode} // Force re-render when view mode changes
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.productsList}
            columnWrapperStyle={viewMode === "grid" ? styles.row : undefined}
          />
        )}

        {/* Filter Modal */}
        <FilterModal
          visible={isFilterModalVisible}
          categories={categories}
          selectedCategory={selectedCategory}
          sortBy={sortBy}
          onCategoryChange={setSelectedCategory}
          onSortChange={setSortBy}
          onClose={() => setIsFilterModalVisible(false)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  filterButton: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  activeCategoryChip: {
    backgroundColor: "#FF2A2A",
    borderColor: "#FF2A2A",
  },
  categoryChipText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  activeCategoryChipText: {
    color: "#fff",
  },
  resultsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  resultsCount: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  viewControls: {
    flexDirection: "row",
    gap: 8,
  },
  viewButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  activeViewButton: {
    borderColor: "#FF2A2A",
    backgroundColor: "#FFE5E5",
  },
  productsList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-between",
  },
  gridItem: {
    flex: 0.48,
    marginBottom: 16,
  },
  listItem: {
    marginBottom: 16,
  },
  listCard: {
    flexDirection: "row",
    height: 120,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },
});
