import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { useCart } from "../context/CartContext";
import { useAppNavigation } from "../hooks/useNavigation";
import { Product } from "../types";
import { Card } from "./Card";

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
  onAddToCart?: () => void;
  style?: ViewStyle;
  showAddButton?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  onAddToCart,
  style,
  showAddButton = true,
}) => {
  const { addToCart } = useCart();
  const { navigateToProduct } = useAppNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigateToProduct(product.id);
    }
  };

  const handleAddToCart = (e: any) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart();
    } else {
      addToCart(product, 1);
    }
  };

  return (
    <Card style={[styles.container, style]} onPress={handlePress}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.images[0] }}
          style={styles.image}
          resizeMode="cover"
        />
        {product.stock <= 5 && product.stock > 0 && (
          <View style={styles.lowStockBadge}>
            <Text style={styles.lowStockText}>Stock faible</Text>
          </View>
        )}
        {product.stock === 0 && (
          <View style={styles.outOfStockOverlay}>
            <Text style={styles.outOfStockText}>Rupture</Text>
          </View>
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={styles.category}>{product.category}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            {product.price.toLocaleString()} FCFA
          </Text>
          {product.originalPrice && product.originalPrice > product.price && (
            <Text style={styles.originalPrice}>
              {product.originalPrice.toLocaleString()} FCFA
            </Text>
          )}
        </View>
        <View style={styles.ratingContainer}>
          <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons
                key={star}
                name={star <= (product.rating || 0) ? "star" : "star-outline"}
                size={12}
                color="#FFD700"
              />
            ))}
          </View>
          <Text style={styles.ratingText}>({product.rating || 0})</Text>
        </View>
      </View>
      {showAddButton && product.stock > 0 && (
        <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
          <Ionicons name="add" size={20} color="#fff" />
        </TouchableOpacity>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
    overflow: "hidden",
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  lowStockBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#FF9800",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  lowStockText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
  },
  outOfStockOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  outOfStockText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  infoContainer: {
    padding: 12,
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
    lineHeight: 18,
  },
  category: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF2A2A",
  },
  originalPrice: {
    fontSize: 12,
    color: "#999",
    textDecorationLine: "line-through",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  stars: {
    flexDirection: "row",
    gap: 1,
  },
  ratingText: {
    fontSize: 12,
    color: "#666",
  },
  addButton: {
    position: "absolute",
    bottom: 12,
    right: 12,
    backgroundColor: "#FF2A2A",
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
