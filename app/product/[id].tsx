import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../../src/components/Header";
import { useCart } from "../../src/context/CartContext";
import { getProductById } from "../../src/data/mockData";

const { width } = Dimensions.get("window");

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const product = getProductById(id);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <View style={styles.notFoundContainer}>
        <Ionicons name="alert-circle-outline" size={64} color="#ccc" />
        <Text style={styles.notFoundText}>Produit non trouvé</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleIncrement = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    // Utiliser le contexte du panier pour ajouter le produit
    addToCart(product, quantity);
    // Afficher une confirmation et rediriger vers le panier
    alert(`${product.name} ajouté au panier`);
    router.push("/cart");
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View style={styles.container}>
        <ScrollView>
          {/* Utiliser le composant Header */}
          <Header title={product.name} showBackButton showCartButton />

          {/* Carousel d'images */}
          <View style={styles.imageContainer}>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={(event) => {
                const newIndex = Math.floor(
                  event.nativeEvent.contentOffset.x / width
                );
                setActiveImageIndex(newIndex);
              }}
            >
              {product.images.map((image, index) => (
                <Image
                  key={index}
                  source={{ uri: image }}
                  style={styles.productImage}
                  resizeMode="cover"
                />
              ))}
            </ScrollView>
            {/* Indicateurs de pagination */}
            <View style={styles.paginationContainer}>
              {product.images.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.paginationDot,
                    index === activeImageIndex && styles.activePaginationDot,
                  ]}
                />
              ))}
            </View>
          </View>

          {/* Informations du produit */}
          <View style={styles.infoContainer}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>
              {product.price.toFixed(2)} FCFA
            </Text>
            <View style={styles.stockInfo}>
              <Text
                style={[
                  styles.stockText,
                  product.stock > 0 ? styles.inStock : styles.outOfStock,
                ]}
              >
                {product.stock > 0
                  ? `En stock (${product.stock})`
                  : "Rupture de stock"}
              </Text>
            </View>

            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{product.description}</Text>

            <Text style={styles.sectionTitle}>Caractéristiques</Text>
            <View style={styles.featuresList}>
              {product.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={18} color="#FF2A2A" />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Détails supplémentaires</Text>
            <View style={styles.featuresList}>
              {product.additionalDetails.map((detail, index) => (
                <View key={index} style={styles.featureItem}>
                  <Ionicons
                    name="information-circle"
                    size={18}
                    color="#FF2A2A"
                  />
                  <Text style={styles.featureText}>{detail}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Barre d'action en bas */}
        <View style={styles.actionBar}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={handleDecrement}
              disabled={quantity <= 1}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={handleIncrement}
              disabled={quantity >= product.stock}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[
              styles.addToCartButton,
              product.stock === 0 && styles.disabledButton,
            ]}
            onPress={handleAddToCart}
            disabled={product.stock === 0}
          >
            <Text style={styles.addToCartButtonText}>
              {product.stock === 0 ? "Indisponible" : "Ajouter au panier"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
    textAlign: "center",
  },
  backIconButton: {
    padding: 4,
  },
  imageContainer: {
    position: "relative",
  },
  productImage: {
    width,
    height: 350,
    backgroundColor: "#f0f0f0",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 16,
    left: 0,
    right: 0,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    marginHorizontal: 4,
  },
  activePaginationDot: {
    backgroundColor: "#fff",
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  infoContainer: {
    padding: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FF2A2A",
    marginBottom: 8,
  },
  stockInfo: {
    marginBottom: 16,
  },
  stockText: {
    fontSize: 14,
    fontWeight: "600",
  },
  inStock: {
    color: "#4CAF50",
  },
  outOfStock: {
    color: "#F44336",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
  featuresList: {
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  featureText: {
    fontSize: 16,
    marginLeft: 8,
    color: "#333",
  },
  actionBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    backgroundColor: "#fff",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  quantityButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  quantity: {
    fontSize: 18,
    marginHorizontal: 12,
    minWidth: 24,
    textAlign: "center",
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: "#FF2A2A",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  addToCartButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#ccc",
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
