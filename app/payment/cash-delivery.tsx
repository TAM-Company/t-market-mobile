import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../src/components/Button";
import { Header } from "../../src/components/Header";
import { useCart } from "../../src/context/CartContext";

export default function CashDeliveryScreen() {
  const router = useRouter();
  const { getCartTotal, clearCart } = useCart();
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = () => {
    // Validation des champs
    if (!fullName || !address || !phoneNumber) {
      Alert.alert(
        "Erreur",
        "Veuillez remplir tous les champs pour finaliser votre commande"
      );
      return;
    }

    if (phoneNumber.length < 10) {
      Alert.alert("Erreur", "Veuillez entrer un numéro de téléphone valide");
      return;
    }

    setIsLoading(true);

    // Simuler un processus de commande
    setTimeout(() => {
      setIsLoading(false);

      // Rediriger vers la page de confirmation
      router.push({
        pathname: "/payment/confirmation",
        params: {
          method: "Paiement à la livraison",
          amount: getCartTotal().toFixed(2),
          phone: phoneNumber,
        },
      });

      // Vider le panier après commande réussie
      clearCart();
    }, 2000);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title="Paiement à la livraison" showBackButton />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.container}>
          <View style={styles.paymentInfoCard}>
            <View style={styles.logoContainer}>
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/2331/2331941.png",
                }}
                style={styles.logo}
              />
              <Text style={styles.logoText}>Paiement à la livraison</Text>
            </View>

            <View style={styles.amountContainer}>
              <Text style={styles.amountLabel}>Montant à payer:</Text>
              <Text style={styles.amount}>
                {getCartTotal().toFixed(2)} FCFA
              </Text>
            </View>

            <View style={styles.instructionsContainer}>
              <Text style={styles.instructionsTitle}>
                Comment fonctionne le paiement à la livraison:
              </Text>
              <View style={styles.instructionItem}>
                <Ionicons name="home" size={20} color="#555" />
                <Text style={styles.instructionText}>
                  Remplissez vos informations de livraison ci-dessous
                </Text>
              </View>
              <View style={styles.instructionItem}>
                <Ionicons name="bicycle" size={20} color="#555" />
                <Text style={styles.instructionText}>
                  Nous vous livrerons votre commande à l'adresse indiquée
                </Text>
              </View>
              <View style={styles.instructionItem}>
                <Ionicons name="cash" size={20} color="#555" />
                <Text style={styles.instructionText}>
                  Payez en espèces à la réception de votre commande
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Informations de livraison</Text>

            <Text style={styles.inputLabel}>Nom complet</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Entrez votre nom complet"
              value={fullName}
              onChangeText={setFullName}
            />

            <Text style={styles.inputLabel}>Adresse de livraison</Text>
            <TextInput
              style={[styles.textInput, styles.addressInput]}
              placeholder="Entrez votre adresse complète"
              value={address}
              onChangeText={setAddress}
              multiline
              numberOfLines={3}
            />

            <Text style={styles.inputLabel}>Numéro de téléphone</Text>
            <View style={styles.phoneInputContainer}>
              <View style={styles.countryCode}>
                <Text style={styles.countryCodeText}>+225</Text>
              </View>
              <TextInput
                style={styles.phoneInput}
                placeholder="XX XX XX XX XX"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                maxLength={10}
              />
            </View>

            <Button
              title={
                isLoading ? "Traitement en cours..." : "Confirmer la commande"
              }
              onPress={handlePayment}
              style={styles.confirmButton}
              disabled={isLoading}
            />
          </View>

          <View style={styles.securityNotice}>
            <Ionicons name="information-circle" size={20} color="#555" />
            <Text style={styles.securityText}>
              En confirmant votre commande, vous acceptez de payer le montant
              total à la livraison.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 16,
  },
  paymentInfoCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginBottom: 8,
  },
  logoText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  amountContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  amountLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  amount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  instructionsContainer: {
    marginBottom: 16,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  instructionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 14,
    color: "#444",
    marginLeft: 8,
    flex: 1,
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  addressInput: {
    height: 100,
    textAlignVertical: "top",
    paddingTop: 12,
  },
  phoneInputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  countryCode: {
    backgroundColor: "#f1f1f1",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    paddingHorizontal: 12,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRightWidth: 0,
  },
  countryCodeText: {
    fontSize: 16,
    color: "#333",
  },
  phoneInput: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  confirmButton: {
    marginTop: 8,
  },
  securityNotice: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 12,
    marginBottom: 24,
  },
  securityText: {
    fontSize: 14,
    color: "#555",
    marginLeft: 8,
    flex: 1,
  },
});
