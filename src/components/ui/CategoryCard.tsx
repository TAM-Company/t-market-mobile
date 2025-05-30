import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Dimensions, Image, Text, View, ViewStyle } from "react-native";
import { useThemedStyles } from "../../context/ThemeContext";
import { Theme } from "../../design/theme";
import { useAppNavigation } from "../../hooks/useNavigation";
import { Category } from "../../types";
import { Card } from "../ui/Card";

type CategoryCardVariant = "default" | "compact" | "featured" | "list" | "grid";
type CategoryCardSize = "sm" | "base" | "lg";

interface CategoryCardProps {
  category: Category;
  variant?: CategoryCardVariant;
  size?: CategoryCardSize;
  showProductCount?: boolean;
  showIcon?: boolean;
  onPress?: (category: Category) => void;
  style?: ViewStyle;
}

const { width: screenWidth } = Dimensions.get("window");

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  variant = "default",
  size = "base",
  showProductCount = true,
  showIcon = true,
  onPress,
  style,
}) => {
  const { navigateToCategory } = useAppNavigation();
  const styles = useThemedStyles(createStyles);

  const handlePress = () => {
    if (onPress) {
      onPress(category);
    } else {
      navigateToCategory(category.id);
    }
  };

  const cardStyle = [
    styles.card,
    styles.variants[variant],
    styles.sizes[size],
    style,
  ];

  const imageStyle = [
    styles.image,
    styles.imageSizes[size],
    variant === "list" && styles.imageList,
  ];

  const contentStyle = [
    styles.content,
    variant === "list" && styles.contentList,
  ];

  // Couleurs de gradient basées sur la catégorie
  const getGradientColors = () => {
    const gradients = {
      electronics: ["#667eea", "#764ba2"],
      fashion: ["#f093fb", "#f5576c"],
      home: ["#4facfe", "#00f2fe"],
      sports: ["#43e97b", "#38f9d7"],
      books: ["#fa709a", "#fee140"],
      beauty: ["#a8edea", "#fed6e3"],
      food: ["#ffecd2", "#fcb69f"],
      default: ["#667eea", "#764ba2"],
    };

    return (
      gradients[category.slug as keyof typeof gradients] || gradients.default
    );
  };

  return (
    <Card
      touchable
      onPress={handlePress}
      style={cardStyle}
      variant="default"
      padding="none"
    >
      {variant === "list" ? (
        // Layout en liste
        <>
          <View style={styles.imageContainer}>
            {category.image ? (
              <Image
                source={{ uri: category.image }}
                style={imageStyle}
                resizeMode="cover"
              />
            ) : (
              <LinearGradient
                colors={getGradientColors()}
                style={imageStyle}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                {showIcon && category.icon && (
                  <View style={styles.iconContainer}>
                    <Ionicons
                      name={category.icon as any}
                      size={24}
                      color="white"
                    />
                  </View>
                )}
              </LinearGradient>
            )}
          </View>

          <View style={contentStyle}>
            <Text style={styles.title} numberOfLines={1}>
              {category.name}
            </Text>
            {showProductCount && category.productCount !== undefined && (
              <Text style={styles.productCount}>
                {category.productCount} produit
                {category.productCount > 1 ? "s" : ""}
              </Text>
            )}
          </View>
        </>
      ) : (
        // Layout par défaut (vertical)
        <>
          <View style={styles.imageContainer}>
            {category.image ? (
              <Image
                source={{ uri: category.image }}
                style={imageStyle}
                resizeMode="cover"
              />
            ) : (
              <LinearGradient
                colors={getGradientColors()}
                style={imageStyle}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                {showIcon && category.icon && (
                  <View style={styles.iconContainer}>
                    <Ionicons
                      name={category.icon as any}
                      size={variant === "compact" ? 24 : 32}
                      color="white"
                    />
                  </View>
                )}
              </LinearGradient>
            )}

            {/* Overlay pour le texte sur l'image */}
            {variant === "featured" && (
              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.7)"]}
                style={styles.overlay}
              >
                <View style={styles.overlayContent}>
                  <Text style={styles.overlayTitle} numberOfLines={2}>
                    {category.name}
                  </Text>
                  {showProductCount && category.productCount !== undefined && (
                    <Text style={styles.overlayProductCount}>
                      {category.productCount} produit
                      {category.productCount > 1 ? "s" : ""}
                    </Text>
                  )}
                </View>
              </LinearGradient>
            )}
          </View>

          {variant !== "featured" && (
            <View style={contentStyle}>
              <Text
                style={styles.title}
                numberOfLines={variant === "compact" ? 1 : 2}
              >
                {category.name}
              </Text>
              {variant !== "compact" && category.description && (
                <Text style={styles.description} numberOfLines={2}>
                  {category.description}
                </Text>
              )}
              {showProductCount && category.productCount !== undefined && (
                <Text style={styles.productCount}>
                  {category.productCount} produit
                  {category.productCount > 1 ? "s" : ""}
                </Text>
              )}
            </View>
          )}
        </>
      )}
    </Card>
  );
};

// Grille de catégories
export const CategoryGrid: React.FC<{
  categories: Category[];
  numColumns?: number;
  variant?: CategoryCardVariant;
  size?: CategoryCardSize;
  onCategoryPress?: (category: Category) => void;
  style?: ViewStyle;
}> = ({
  categories,
  numColumns = 2,
  variant = "default",
  size = "base",
  onCategoryPress,
  style,
}) => {
  const styles = useThemedStyles(createStyles);

  const cardWidth = (screenWidth - (numColumns + 1) * 16) / numColumns;

  return (
    <View style={[styles.grid, style]}>
      {categories.map((category, index) => (
        <CategoryCard
          key={category.id}
          category={category}
          variant={variant}
          size={size}
          onPress={onCategoryPress}
          style={[
            styles.gridItem,
            { width: cardWidth },
            (index + 1) % numColumns !== 0 && styles.gridItemMargin,
          ]}
        />
      ))}
    </View>
  );
};

// Liste de catégories
export const CategoryList: React.FC<{
  categories: Category[];
  onCategoryPress?: (category: Category) => void;
  style?: ViewStyle;
}> = ({ categories, onCategoryPress, style }) => {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={[styles.list, style]}>
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          variant="list"
          onPress={onCategoryPress}
          style={styles.listItem}
        />
      ))}
    </View>
  );
};

// Carrousel de catégories horizontales
export const CategoryCarousel: React.FC<{
  categories: Category[];
  onCategoryPress?: (category: Category) => void;
  style?: ViewStyle;
}> = ({ categories, onCategoryPress, style }) => {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={[styles.carousel, style]}>
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          variant="compact"
          size="sm"
          onPress={onCategoryPress}
          style={styles.carouselItem}
        />
      ))}
    </View>
  );
};

const createStyles = (theme: Theme) => ({
  card: {
    overflow: "hidden" as const,
  },

  // Variantes
  variants: {
    default: {
      // Style par défaut
    },
    compact: {
      // Version compacte
    },
    featured: {
      ...theme.shadows.lg,
    },
    list: {
      flexDirection: "row" as const,
    },
    grid: {
      // Style grille
    },
  },

  // Tailles
  sizes: {
    sm: {
      // Petite taille
    },
    base: {
      // Taille normale
    },
    lg: {
      // Grande taille
    },
  },

  // Image
  imageContainer: {
    position: "relative" as const,
  },

  image: {
    width: "100%",
    backgroundColor: theme.colors.background.secondary,
  },

  imageSizes: {
    sm: {
      height: 80,
    },
    base: {
      height: 120,
    },
    lg: {
      height: 160,
    },
  },

  imageList: {
    width: 60,
    height: 60,
  },

  // Icône
  iconContainer: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center" as const,
    alignItems: "center" as const,
  },

  // Overlay pour featured
  overlay: {
    position: "absolute" as const,
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    justifyContent: "flex-end" as const,
  },

  overlayContent: {
    padding: theme.spacing[3],
  },

  overlayTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: "white",
    marginBottom: theme.spacing[1],
  },

  overlayProductCount: {
    fontSize: theme.typography.fontSize.sm,
    color: "rgba(255, 255, 255, 0.8)",
  },

  // Contenu
  content: {
    padding: theme.spacing[3],
    flex: 1,
  },

  contentList: {
    paddingLeft: theme.spacing[3],
    justifyContent: "center" as const,
  },

  title: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[1],
  },

  description: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing[2],
    lineHeight: theme.typography.lineHeight.sm,
  },

  productCount: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.tertiary,
  },

  // Grille
  grid: {
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    paddingHorizontal: theme.spacing[4],
  },

  gridItem: {
    marginBottom: theme.spacing[4],
  },

  gridItemMargin: {
    marginRight: theme.spacing[4],
  },

  // Liste
  list: {
    paddingHorizontal: theme.spacing[4],
  },

  listItem: {
    marginBottom: theme.spacing[3],
  },

  // Carrousel
  carousel: {
    flexDirection: "row" as const,
    paddingHorizontal: theme.spacing[4],
  },

  carouselItem: {
    width: 100,
    marginRight: theme.spacing[3],
  },
});
