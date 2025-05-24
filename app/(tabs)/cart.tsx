import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
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

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");

  const handleContinueShopping = () => {
    router.push("/products");
  };

  const handleCheckout = () => {
    // Rediriger vers la page de sélection des méthodes de paiement
    router.push("/payment");
  };

  const applyPromoCode = () => {
    // Réinitialiser les états précédents
    setPromoError("");
    setPromoApplied(false);
    setDiscount(0);

    // Simuler la vérification du code promo
    if (promoCode.trim() === "") {
      setPromoError("Veuillez entrer un code promo");
      return;
    }

    const validPromoCodes = {
      BIENVENUE10: 10,
      ETE2023: 15,
      FIDELITE: 20,
    };

    if (Object.prototype.hasOwnProperty.call(validPromoCodes, promoCode)) {
      const discountPercent =
        validPromoCodes[promoCode as keyof typeof validPromoCodes];
      const discountAmount = (getCartTotal() * discountPercent) / 100;
      setDiscount(discountAmount);
      setPromoApplied(true);
    } else {
      setPromoError("Code promo invalide");
    }
  };

  const getFinalTotal = () => {
    return getCartTotal() - discount;
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
                  onIncrement={() =>
                    updateQuantity(item.product.id, item.quantity + 1)
                  }
                  onDecrement={() =>
                    updateQuantity(item.product.id, item.quantity - 1)
                  }
                />
              )}
              contentContainerStyle={styles.listContainer}
            />
            <View style={styles.summaryContainer}>
              <View style={styles.promoContainer}>
                <TextInput
                  style={styles.promoInput}
                  placeholder="Code promo"
                  placeholderTextColor="#999"
                  value={promoCode}
                  onChangeText={setPromoCode}
                />
                <TouchableOpacity
                  style={styles.promoButton}
                  onPress={applyPromoCode}
                >
                  <Text style={styles.promoButtonText}>Appliquer</Text>
                </TouchableOpacity>
              </View>

              {promoError ? (
                <Text style={styles.errorText}>{promoError}</Text>
              ) : promoApplied ? (
                <Text style={styles.successText}>
                  Code promo appliqué avec succès!
                </Text>
              ) : null}

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Sous-total</Text>
                <Text style={styles.summaryValue}>
                  {getCartTotal().toFixed(2)} FCFA
                </Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Réduction</Text>
                <Text style={styles.discountValue}>
                  {discount.toFixed(2)} FCFA
                  {promoApplied && ` (${promoCode})`}
                </Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, styles.totalLabel]}>
                  Total
                </Text>
                <Text style={styles.summaryValue}>
                  {getFinalTotal().toFixed(2)} FCFA
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
  promoContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  promoInput: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
  },
  promoButton: {
    backgroundColor: "#FF2A2A",
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  promoButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  errorText: {
    color: "#FF2A2A",
    fontSize: 12,
    marginBottom: 10,
  },
  successText: {
    color: "#4CAF50",
    fontSize: 12,
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 10,
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
  totalLabel: {
    fontWeight: "bold",
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF2A2A",
  },
  discountValue: {
    fontSize: 16,
    color: "#4CAF50",
    fontWeight: "600",
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
