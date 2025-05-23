import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Product } from "../types";
import { Card } from "./Card";

interface ProductCardProps {
  product: Product;
  onAddToCart?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
}) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/product/${product.id}`);
  };

  return (
    <Card style={styles.container} onPress={handlePress}>
      <Image
        source={{ uri: product.images[0] }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={styles.price}>{product.price} FCFA</Text>
        <View style={styles.stockContainer}>
          <Text
            style={[
              styles.stock,
              product.stock > 0 ? styles.inStock : styles.outOfStock,
            ]}
          >
            {product.stock > 0
              ? `En stock (${product.stock})`
              : "Rupture de stock"}
          </Text>
        </View>
      </View>
      {onAddToCart && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={(e) => {
            e.stopPropagation();
            onAddToCart();
          }}
        >
          <Text style={styles.addButtonText}>Ajouter</Text>
        </TouchableOpacity>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    padding: 0,
    width: "100%",
  },
  image: {
    width: "100%",
    height: 180,
    backgroundColor: "#f0f0f0",
  },
  infoContainer: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF2A2A",
    marginBottom: 4,
  },
  stockContainer: {
    marginTop: 4,
  },
  stock: {
    fontSize: 14,
  },
  inStock: {
    color: "#4CAF50",
  },
  outOfStock: {
    color: "#F44336",
  },
  addButton: {
    backgroundColor: "#FF2A2A",
    padding: 8,
    alignItems: "center",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
