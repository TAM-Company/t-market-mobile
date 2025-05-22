import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FilterModal } from "../src/components/FilterModal";
import { ProductCard } from "../src/components/ProductCard";
import { filterProducts, products } from "../src/data/mockData";
import { FilterOptions, Product } from "../src/types";

export default function ProductsScreen() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    searchQuery: "",
    category: "",
    minPrice: null,
    maxPrice: null,
    inStock: false,
  });

  useEffect(() => {
    // Appliquer les filtres
    const filtered = filterProducts(
      products,
      filters.searchQuery,
      filters.category,
      filters.minPrice,
      filters.maxPrice,
      filters.inStock
    );
    setFilteredProducts(filtered);
  }, [filters]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setFilters((prev) => ({ ...prev, searchQuery: text }));
  };

  const handleApplyFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleAddToCart = (product: Product) => {
    // Cette fonction sera implémentée avec un contexte global
    console.log(`Ajouter au panier: ${product.name}`);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Ionicons
              name="search-outline"
              size={20}
              color="#666"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher un produit..."
              value={searchQuery}
              onChangeText={handleSearch}
            />
          </View>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setIsFilterModalVisible(true)}
          >
            <Ionicons name="options-outline" size={24} color="#FF2A2A" />
          </TouchableOpacity>
        </View>

        {filteredProducts.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="search" size={64} color="#ccc" />
            <Text style={styles.emptyText}>Aucun produit trouvé</Text>
            <Text style={styles.emptySubtext}>
              Essayez de modifier vos filtres
            </Text>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={() => {
                setFilters({
                  searchQuery: "",
                  category: "",
                  minPrice: null,
                  maxPrice: null,
                  inStock: false,
                });
                setSearchQuery("");
              }}
            >
              <Text style={styles.resetButtonText}>
                Réinitialiser les filtres
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.productCardContainer}>
                <ProductCard
                  product={item}
                  onAddToCart={() => handleAddToCart(item)}
                />
              </View>
            )}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={styles.listContent}
          />
        )}

        <FilterModal
          visible={isFilterModalVisible}
          onClose={() => setIsFilterModalVisible(false)}
          currentFilters={filters}
          onApplyFilters={handleApplyFilters}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  searchContainer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  filterButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  listContent: {
    padding: 8,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  productCardContainer: {
    width: "48%",
    marginBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
    marginBottom: 24,
  },
  resetButton: {
    backgroundColor: "#FF2A2A",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  resetButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
