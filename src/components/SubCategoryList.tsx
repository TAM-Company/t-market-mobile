import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SubCategory } from "../types";

interface SubCategoryListProps {
  subCategories: SubCategory[];
  categoryId?: string;
  title?: string;
}

export const SubCategoryList: React.FC<SubCategoryListProps> = ({
  subCategories,
  categoryId,
  title,
}) => {
  const router = useRouter();

  const handleSubCategoryPress = (subCategoryId: string) => {
    router.push(`/subcategory/${subCategoryId}`);
  };

  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <FlatList
        data={subCategories}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.subCategoryItem}
            onPress={() => handleSubCategoryPress(item.id)}
          >
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.image }} style={styles.image} />
            </View>
            <Text style={styles.name} numberOfLines={2}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  listContent: {
    paddingHorizontal: 8,
  },
  subCategoryItem: {
    width: 100,
    marginHorizontal: 8,
    alignItems: "center",
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#f0f0f0",
    overflow: "hidden",
    marginBottom: 8,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  name: {
    fontSize: 14,
    textAlign: "center",
    color: "#333",
  },
});
