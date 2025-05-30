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
import { CategoryCard } from "../../src/components/CategoryCard";
import { Header } from "../../src/components/Header";
import { mockCategories } from "../../src/data/mockData";
import { Category } from "../../src/types";

export default function CategorieScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredCategories = mockCategories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategoryPress = (categoryId: string) => {
    router.push(`/category/${categoryId}`);
  };

  const renderCategory = ({ item }: { item: Category }) => (
    <View style={viewMode === "grid" ? styles.gridItem : styles.listItem}>
      <CategoryCard
        category={item}
        onPress={() => handleCategoryPress(item.id)}
        style={viewMode === "list" ? styles.listCard : undefined}
      />
    </View>
  );

  const popularCategories = mockCategories.filter((cat) =>
    ["Électronique", "Mode", "Maison", "Sport"].includes(cat.name)
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title="Catégories" showBackButton showCartButton />
      <View style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={20} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher une catégorie..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons name="close-circle" size={20} color="#666" />
              </TouchableOpacity>
            )}
          </View>
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

        {/* Popular Categories Section */}
        {!searchQuery && (
          <View style={styles.popularSection}>
            <Text style={styles.sectionTitle}>Catégories Populaires</Text>
            <FlatList
              data={popularCategories}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.popularCard}
                  onPress={() => handleCategoryPress(item.id)}
                >
                  <View style={styles.popularIcon}>
                    <Ionicons
                      name={item.icon as any}
                      size={24}
                      color="#FF2A2A"
                    />
                  </View>
                  <Text style={styles.popularName}>{item.name}</Text>
                  <Text style={styles.popularCount}>
                    {item.productCount} produits
                  </Text>
                </TouchableOpacity>
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.popularList}
            />
          </View>
        )}

        {/* Results Header */}
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            {filteredCategories.length} catégorie
            {filteredCategories.length > 1 ? "s" : ""}
            {searchQuery && ` pour "${searchQuery}"`}
          </Text>
        </View>

        {/* Categories List */}
        {filteredCategories.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="search" size={64} color="#ccc" />
            <Text style={styles.emptyTitle}>Aucune catégorie trouvée</Text>
            <Text style={styles.emptyMessage}>
              Essayez de modifier votre recherche
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredCategories}
            renderItem={renderCategory}
            keyExtractor={(item) => item.id}
            numColumns={viewMode === "grid" ? 2 : 1}
            key={viewMode} // Force re-render when view mode changes
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
            columnWrapperStyle={viewMode === "grid" ? styles.row : undefined}
          />
        )}
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
    alignItems: "center",
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
  popularSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  popularList: {
    paddingHorizontal: 20,
  },
  popularCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    alignItems: "center",
    width: 120,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  popularIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFE5E5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  popularName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 4,
  },
  popularCount: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  resultsHeader: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  resultsCount: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  categoriesList: {
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
    height: 80,
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
