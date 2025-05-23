import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../src/components/Button";
import { CartItem as CartItemComponent } from "../../src/components/CartItem";
import { Header } from "../../src/components/Header";
import { useCart } from "../../src/context/CartContext";

export default function CartScreen() {
  const router = useRouter();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } =
    useCart();

  const handleContinueShopping = () => {
    router.push("/products");
  };

  const handleCheckout = () => {
    // Rediriger vers la page de sélection des méthodes de paiement
    router.push("/payment");
  };

  const renderEmptyCart = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Votre panier est vide</Text>
      <Text style={styles.emptySubText}>
        Ajoutez des produits à votre panier pour les voir ici
      </Text>
      <Button
        title="Continuer les achats"
        onPress={handleContinueShopping}
        style={styles.continueButton}
      />
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title="Panier" />
      <View style={styles.container}>
        {cartItems.length === 0 ? (
          renderEmptyCart()
        ) : (
          <>
            <FlatList
              data={cartItems}
              keyExtractor={(item) => item.product.id}
              renderItem={({ item }) => (
                <CartItemComponent
                  item={item}
                  onRemove={() => removeFromCart(item.product.id)}
                  onUpdateQuantity={(quantity) =>
                    updateQuantity(item.product.id, quantity)
                  }
                />
              )}
              contentContainerStyle={styles.listContainer}
            />
            <View style={styles.summaryContainer}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Total</Text>
                <Text style={styles.summaryValue}>
                  {getCartTotal().toFixed(2)} €
                </Text>
              </View>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={styles.clearButton}
                  onPress={clearCart}
                >
                  <Text style={styles.clearButtonText}>Vider le panier</Text>
                </TouchableOpacity>
                <Button
                  title="Commander"
                  onPress={handleCheckout}
                  style={styles.checkoutButton}
                />
              </View>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
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
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
  },
  continueButton: {
    marginTop: 16,
    width: "80%",
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 120,
  },
  summaryContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  summaryLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF2A2A",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  clearButton: {
    padding: 10,
  },
  clearButtonText: {
    color: "#666",
    fontWeight: "500",
  },
  checkoutButton: {
    flex: 1,
    marginLeft: 16,
  },
});
