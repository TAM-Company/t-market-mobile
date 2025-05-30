import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { useCart } from "../../context/CartContext";
import { useThemedStyles } from "../../context/ThemeContext";
import { Theme } from "../../design/theme";
import { useAppNavigation } from "../../hooks/useNavigation";
import { Product } from "../../types";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

type ProductCardVariant = "default" | "compact" | "featured" | "list";
type ProductCardSize = "sm" | "base" | "lg";

interface ProductCardProps {
  product: Product;
  variant?: ProductCardVariant;
  size?: ProductCardSize;
  showAddToCart?: boolean;
  showFavorite?: boolean;
  showDiscount?: boolean;
  onPress?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  onToggleFavorite?: (product: Product) => void;
  style?: ViewStyle;
}

const { width: screenWidth } = Dimensions.get("window");

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  variant = "default",
  size = "base",
  showAddToCart = true,
  showFavorite = true,
  showDiscount = true,
  onPress,
  onAddToCart,
  onToggleFavorite,
  style,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { navigateToProduct } = useAppNavigation();
  const { addToCart } = useCart();
  const styles = useThemedStyles(createStyles);

  const handlePress = () => {
    if (onPress) {
      onPress(product);
    } else {
      navigateToProduct(product.id);
    }
  };

  const handleAddToCart = (e: any) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      addToCart(product);
    }
  };

  const handleToggleFavorite = (e: any) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    onToggleFavorite?.(product);
  };

  const getDiscountPercentage = () => {
    if (!product.originalPrice || product.originalPrice <= product.price) {
      return 0;
    }
    return Math.round(
      ((product.originalPrice - product.price) / product.originalPrice) * 100
    );
  };

  const discountPercentage = getDiscountPercentage();
  const hasDiscount = discountPercentage > 0;

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

  return (
    <Card
      touchable
      onPress={handlePress}
      style={cardStyle}
      variant="default"
      padding="none"
    >
      {/* Container d'image avec badges */}
      <View style={styles.imageContainer}>
        <Image
          source={
            imageError
              ? require("../../assets/placeholder.png")
              : { uri: product.image }
          }
          style={imageStyle}
          resizeMode="cover"
          onError={() => setImageError(true)}
        />

        {/* Badge de réduction */}
        {showDiscount && hasDiscount && (
          <Badge
            text={`-${discountPercentage}%`}
            variant="error"
            size="sm"
            style={styles.discountBadge}
          />
        )}

        {/* Badge de stock */}
        {product.stock === 0 && (
          <Badge
            text="Épuisé"
            variant="neutral"
            size="sm"
            style={styles.stockBadge}
          />
        )}

        {/* Bouton favori */}
        {showFavorite && (
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={handleToggleFavorite}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={20}
              color={
                isFavorite
                  ? styles.favoriteActiveColor
                  : styles.favoriteInactiveColor
              }
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Contenu */}
      <View style={contentStyle}>
        {/* Informations du produit */}
        <View style={styles.productInfo}>
          <Text
            style={styles.title}
            numberOfLines={variant === "compact" ? 1 : 2}
          >
            {product.name}
          </Text>

          {variant !== "compact" && product.description && (
            <Text style={styles.description} numberOfLines={2}>
              {product.description}
            </Text>
          )}

          {/* Prix */}
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{product.price.toFixed(2)} €</Text>
            {hasDiscount && (
              <Text style={styles.originalPrice}>
                {product.originalPrice?.toFixed(2)} €
              </Text>
            )}
          </View>

          {/* Note et avis */}
          {product.rating && (
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={14} color={styles.starColor} />
              <Text style={styles.rating}>{product.rating.toFixed(1)}</Text>
              {product.reviewCount && (
                <Text style={styles.reviewCount}>({product.reviewCount})</Text>
              )}
            </View>
          )}
        </View>

        {/* Actions */}
        {showAddToCart && variant !== "compact" && (
          <View style={styles.actions}>
            <Button
              variant={product.stock === 0 ? "outline" : "primary"}
              size="sm"
              onPress={handleAddToCart}
              disabled={product.stock === 0}
              style={styles.addToCartButton}
            >
              {product.stock === 0 ? "Épuisé" : "Ajouter"}
            </Button>
          </View>
        )}
      </View>
    </Card>
  );
};

// Grille de produits
export const ProductGrid: React.FC<{
  products: Product[];
  numColumns?: number;
  variant?: ProductCardVariant;
  size?: ProductCardSize;
  onProductPress?: (product: Product) => void;
  style?: ViewStyle;
}> = ({
  products,
  numColumns = 2,
  variant = "default",
  size = "base",
  onProductPress,
  style,
}) => {
  const styles = useThemedStyles(createStyles);

  const cardWidth = (screenWidth - (numColumns + 1) * 16) / numColumns;

  return (
    <View style={[styles.grid, style]}>
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          variant={variant}
          size={size}
          onPress={onProductPress}
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

// Liste de produits
export const ProductList: React.FC<{
  products: Product[];
  onProductPress?: (product: Product) => void;
  style?: ViewStyle;
}> = ({ products, onProductPress, style }) => {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={[styles.list, style]}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          variant="list"
          onPress={onProductPress}
          style={styles.listItem}
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
      height: 120,
    },
    base: {
      height: 160,
    },
    lg: {
      height: 200,
    },
  },

  imageList: {
    width: 80,
    height: 80,
  },

  // Contenu
  content: {
    padding: theme.spacing[3],
    flex: 1,
  },

  contentList: {
    paddingLeft: theme.spacing[3],
  },

  productInfo: {
    flex: 1,
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

  // Prix
  priceContainer: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    marginBottom: theme.spacing[2],
  },

  price: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary[600],
    marginRight: theme.spacing[2],
  },

  originalPrice: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.tertiary,
    textDecorationLine: "line-through" as const,
  },

  // Note
  ratingContainer: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    marginBottom: theme.spacing[2],
  },

  rating: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.primary,
    marginLeft: theme.spacing[1],
    marginRight: theme.spacing[1],
  },

  reviewCount: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.tertiary,
  },

  // Actions
  actions: {
    marginTop: theme.spacing[2],
  },

  addToCartButton: {
    // Style du bouton d'ajout au panier
  },

  // Badges
  discountBadge: {
    position: "absolute" as const,
    top: theme.spacing[2],
    left: theme.spacing[2],
  },

  stockBadge: {
    position: "absolute" as const,
    top: theme.spacing[2],
    right: theme.spacing[2],
  },

  // Bouton favori
  favoriteButton: {
    position: "absolute" as const,
    top: theme.spacing[2],
    right: theme.spacing[2],
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.full,
    padding: theme.spacing[2],
    ...theme.shadows.sm,
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

  // Couleurs
  favoriteActiveColor: theme.colors.status.error,
  favoriteInactiveColor: theme.colors.text.tertiary,
  starColor: theme.colors.status.warning,
});
