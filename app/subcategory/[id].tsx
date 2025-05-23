import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../../src/components/Header";
import { ProductCard } from "../../src/components/ProductCard";
import { useCart } from "../../src/context/CartContext";
import {
  getProductsBySubCategory,
  getSubCategoryById,
} from "../../src/data/mockData";
import { Product, SubCategory } from "../../src/types";

export default function SubCategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [subCategory, setSubCategory] = useState<SubCategory | undefined>();

  useEffect(() => {
    if (id) {
      const foundSubCategory = getSubCategoryById(id);
      setSubCategory(foundSubCategory);

      const subCategoryProducts = getProductsBySubCategory(id);
      setProducts(subCategoryProducts);
    }
  }, [id]);

  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
  };

  if (!subCategory) {
    return (
      <View style={styles.notFoundContainer}>
        <Ionicons name="alert-circle-outline" size={64} color="#ccc" />
        <Text style={styles.notFoundText}>Sous-catégorie non trouvée</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Header title={subCategory.name} showBackButton showCartButton />

      {products.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="cube-outline" size={64} color="#ccc" />
          <Text style={styles.emptyText}>
            Aucun produit dans cette sous-catégorie
          </Text>
        </View>
      ) : (
        <FlatList
          data={products}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
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
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  notFoundText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 24,
  },
  backButton: {
    backgroundColor: "#FF2A2A",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
