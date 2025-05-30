import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../../src/components/Header";
import { useCart } from "../../src/context/CartContext";

interface CartItemProps {
  item: any;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  return (
    <View style={styles.cartItem}>
      <Image
        source={{ uri: item.product.images[0] }}
        style={styles.itemImage}
      />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName} numberOfLines={2}>
          {item.product.name}
        </Text>
        <Text style={styles.itemCategory}>{item.product.category}</Text>
        <Text style={styles.itemPrice}>
          {item.product.price.toLocaleString()} FCFA
        </Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
        >
          <Ionicons name="remove" size={16} color="#FF2A2A" />
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
        >
          <Ionicons name="add" size={16} color="#FF2A2A" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => onRemove(item.product.id)}
      >
        <Ionicons name="trash-outline" size={20} color="#FF2A2A" />
      </TouchableOpacity>
    </View>
  );
};

export default function CartScreen() {
  const { items, updateQuantity, removeFromCart, clearCart, getTotal } =
    useCart();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
    } else {
      updateQuantity(id, quantity);
    }
  };

  const handleRemoveItem = (id: string) => {
    Alert.alert(
      "Supprimer l'article",
      "Êtes-vous sûr de vouloir supprimer cet article du panier ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () => removeFromCart(id),
        },
      ]
    );
  };

  const handleClearCart = () => {
    Alert.alert(
      "Vider le panier",
      "Êtes-vous sûr de vouloir vider tout le panier ?",
      [
        { text: "Annuler", style: "cancel" },
        { text: "Vider", style: "destructive", onPress: clearCart },
      ]
    );
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      Alert.alert(
        "Panier vide",
        "Ajoutez des articles avant de passer commande."
      );
      return;
    }

    setIsLoading(true);
    // Simuler le processus de commande
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        "Commande confirmée",
        "Votre commande a été passée avec succès !",
        [{ text: "OK", onPress: () => router.push("/(tabs)/commerce") }]
      );
      clearCart();
    }, 2000);
  };

  const renderEmptyCart = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="cart-outline" size={80} color="#ccc" />
      <Text style={styles.emptyTitle}>Votre panier est vide</Text>
      <Text style={styles.emptySubtitle}>
        Découvrez nos produits et ajoutez-les à votre panier
      </Text>
      <TouchableOpacity
        style={styles.shopButton}
        onPress={() => router.push("/(tabs)/commerce")}
      >
        <Text style={styles.shopButtonText}>Commencer mes achats</Text>
      </TouchableOpacity>
    </View>
  );

  const total = getTotal();
  const deliveryFee = total > 50000 ? 0 : 2500;
  const finalTotal = total + deliveryFee;

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Mon Panier" showBack />

      {items.length === 0 ? (
        renderEmptyCart()
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.itemCount}>
              {items.length} article{items.length > 1 ? "s" : ""}
            </Text>
            <TouchableOpacity onPress={handleClearCart}>
              <Text style={styles.clearButton}>Vider le panier</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={items}
            keyExtractor={(item) => item.product.id}
            renderItem={({ item }) => (
              <CartItem
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemoveItem}
              />
            )}
            style={styles.list}
            showsVerticalScrollIndicator={false}
          />

          <View style={styles.summary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Sous-total</Text>
              <Text style={styles.summaryValue}>
                {total.toLocaleString()} FCFA
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Livraison</Text>
              <Text style={styles.summaryValue}>
                {deliveryFee === 0
                  ? "Gratuite"
                  : `${deliveryFee.toLocaleString()} FCFA`}
              </Text>
            </View>
            {deliveryFee === 0 && (
              <Text style={styles.freeDeliveryNote}>
                🎉 Livraison gratuite pour les commandes de plus de 50 000 FCFA
              </Text>
            )}
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>
                {finalTotal.toLocaleString()} FCFA
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.checkoutButton,
              isLoading && styles.checkoutButtonDisabled,
            ]}
            onPress={handleCheckout}
            disabled={isLoading}
          >
            <Text style={styles.checkoutButtonText}>
              {isLoading ? "Traitement..." : "Passer la commande"}
            </Text>
            {!isLoading && (
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            )}
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemCount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  clearButton: {
    fontSize: 14,
    color: "#FF2A2A",
    fontWeight: "500",
  },
  list: {
    flex: 1,
    paddingHorizontal: 16,
  },
  cartItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginVertical: 6,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
    marginRight: 12,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  itemCategory: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FF2A2A",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FF2A2A",
  },
  quantity: {
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: "center",
  },
  removeButton: {
    padding: 8,
  },
  summary: {
    backgroundColor: "#fff",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#666",
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  freeDeliveryNote: {
    fontSize: 12,
    color: "#4CAF50",
    textAlign: "center",
    marginBottom: 8,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 8,
    marginTop: 8,
    marginBottom: 0,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF2A2A",
  },
  checkoutButton: {
    backgroundColor: "#FF2A2A",
    margin: 16,
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  checkoutButtonDisabled: {
    backgroundColor: "#ccc",
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },
  shopButton: {
    backgroundColor: "#FF2A2A",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  shopButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
