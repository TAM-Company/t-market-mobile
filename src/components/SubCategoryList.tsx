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
import { useThemedStyles } from "../context/ThemeContext";
import { Theme } from "../design/theme";

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
  const styles = useThemedStyles(createStyles);
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

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      marginVertical: theme.spacing[4], // Updated
    },
    title: {
      fontSize: theme.typography.fontSize.lg, // Updated
      fontWeight: theme.typography.fontWeight.semibold, // Updated
      color: theme.colors.text.primary, // Added
      marginBottom: theme.spacing[3], // Updated
      paddingHorizontal: theme.spacing[4], // Updated
    },
    listContent: {
      paddingHorizontal: theme.spacing[2], // Updated
    },
    subCategoryItem: {
      width: 100, // This could be theme-dependent if needed
      marginHorizontal: theme.spacing[2], // Updated
      alignItems: "center",
    },
    imageContainer: {
      width: 80, // Could be theme-dependent
      height: 80, // Could be theme-dependent
      borderRadius: 40, // Half of width/height for circle
      backgroundColor: theme.colors.background.secondary, // Updated
      overflow: "hidden",
      marginBottom: theme.spacing[2], // Updated
    },
    image: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
    },
    name: {
      fontSize: theme.typography.fontSize.sm, // Updated
      textAlign: "center",
      color: theme.colors.text.primary, // Updated
    },
  });
