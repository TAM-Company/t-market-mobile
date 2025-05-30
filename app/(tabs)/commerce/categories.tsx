import { CategoryCard } from "@/src/components/CategoryCard";
import { Header } from "@/src/components/Header";
import { SubCategoryList } from "@/src/components/SubCategoryList";
import { categories, subCategories } from "@/src/data/mockData";
import { SubCategory } from "@/src/types";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CategoriesScreen() {
  const router = useRouter();
  const [categorySubcategories, setCategorySubcategories] = useState<
    Record<string, SubCategory[]>
  >({});

  useEffect(() => {
    // Organiser les sous-catégories par catégorie
    const subCategoriesByCategory: Record<string, SubCategory[]> = {};

    categories.forEach((category) => {
      const categorySubcats = subCategories.filter(
        (subcat) => subcat.categoryId === category.id
      );
      subCategoriesByCategory[category.id] = categorySubcats;
    });

    setCategorySubcategories(subCategoriesByCategory);
  }, []);

  const handleCategoryPress = (categoryId: string) => {
    router.push(`/category/${categoryId}`);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title="Catégories" showCartButton />
      <View style={styles.container}>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.categorySection}>
              <TouchableOpacity
                style={styles.categoryItem}
                onPress={() => handleCategoryPress(item.id)}
              >
                <CategoryCard category={item} />
                <View style={styles.arrowContainer}>
                  <Ionicons name="chevron-forward" size={24} color="#888" />
                </View>
              </TouchableOpacity>
              {categorySubcategories[item.id] &&
                categorySubcategories[item.id].length > 0 && (
                  <SubCategoryList
                    subCategories={categorySubcategories[item.id]}
                    categoryId={item.id}
                    title="Sous-catégories"
                  />
                )}
            </View>
          )}
          contentContainerStyle={styles.listContent}
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
  listContent: {
    padding: 16,
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryItem: {
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
  },
  arrowContainer: {
    paddingRight: 16,
  },
});
