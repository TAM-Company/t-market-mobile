import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../../src/components/Header";
import {
  categories,
  getSubCategoriesByCategory,
} from "../../src/data/mockData";
import { SubCategory } from "../../src/types";

export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const category = categories.find((cat) => cat.id === id);

  useEffect(() => {
    if (id) {
      const categorySubCategories = getSubCategoriesByCategory(id);
      setSubCategories(categorySubCategories);
    }
  }, [id]);

  const handleSubCategoryPress = (subCategoryId: string) => {
    router.push(`/subcategory/${subCategoryId}`);
  };

  if (!category) {
    return (
      <View style={styles.notFoundContainer}>
        <Ionicons name="alert-circle-outline" size={64} color="#ccc" />
        <Text style={styles.notFoundText}>Catégorie non trouvée</Text>
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
      <Header title={category.name} showBackButton showCartButton />

      {subCategories.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="cube-outline" size={64} color="#ccc" />
          <Text style={styles.emptyText}>Aucune sous-catégorie disponible</Text>
        </View>
      ) : (
        <FlatList
          data={subCategories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.subCategoryItem}
              onPress={() => handleSubCategoryPress(item.id)}
            >
              <Image
                source={{ uri: item.image }}
                style={styles.subCategoryImage}
              />
              <View style={styles.subCategoryContent}>
                <Text style={styles.subCategoryName}>{item.name}</Text>
              </View>
              <View style={styles.arrowContainer}>
                <Ionicons name="chevron-forward" size={24} color="#888" />
              </View>
            </TouchableOpacity>
          )}
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
    padding: 16,
  },
  subCategoryItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: "hidden",
  },
  subCategoryImage: {
    width: 80,
    height: 80,
    resizeMode: "cover",
  },
  subCategoryContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  subCategoryName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  arrowContainer: {
    paddingRight: 16,
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
