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

export default function MoovFloozPaymentScreen() {
  const router = useRouter();
  const { getCartTotal, clearCart } = useCart();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = () => {
    // Validation du numéro de téléphone
    if (!phoneNumber || phoneNumber.length < 10) {
      Alert.alert(
        "Erreur",
        "Veuillez entrer un numéro de téléphone Moov Flooz valide"
      );
      return;
    }

    setIsLoading(true);

    // Simuler un processus de paiement
    setTimeout(() => {
      setIsLoading(false);

      // Rediriger vers la page de confirmation
      router.push({
        pathname: "/payment/confirmation",
        params: {
          method: "Moov Flooz",
          amount: getCartTotal().toFixed(2),
          phone: phoneNumber,
        },
      });

      // Vider le panier après paiement réussi
      clearCart();
    }, 2000);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title="Paiement Moov Flooz" showBackButton />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.container}>
          <View style={styles.paymentInfoCard}>
            <View style={styles.logoContainer}>
              <Image
                source={{
                  uri: "https://play-lh.googleusercontent.com/Vn5v1iVaQHY-kQw9aYksBQzC2deZc_LLCDLCkAITjEbGQ_uGYD5_VgHUoWI-k0xwRA=w240-h480-rw",
                }}
                style={styles.logo}
              />
              <Text style={styles.logoText}>Moov Flooz</Text>
            </View>

            <View style={styles.amountContainer}>
              <Text style={styles.amountLabel}>Montant à payer:</Text>
              <Text style={styles.amount}>{getCartTotal().toFixed(2)} €</Text>
            </View>

            <View style={styles.instructionsContainer}>
              <Text style={styles.instructionsTitle}>
                Comment payer avec Moov Flooz:
              </Text>
              <View style={styles.instructionItem}>
                <Ionicons name="phone-portrait" size={20} color="#00A1E0" />
                <Text style={styles.instructionText}>
                  Entrez votre numéro de téléphone Moov ci-dessous
                </Text>
              </View>
              <View style={styles.instructionItem}>
                <Ionicons name="checkmark-circle" size={20} color="#00A1E0" />
                <Text style={styles.instructionText}>
                  Vous recevrez une notification sur votre téléphone
                </Text>
              </View>
              <View style={styles.instructionItem}>
                <Ionicons name="lock-closed" size={20} color="#00A1E0" />
                <Text style={styles.instructionText}>
                  Confirmez le paiement avec votre code secret Flooz
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.inputLabel}>
              Numéro de téléphone Moov Flooz
            </Text>
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
              title={isLoading ? "Traitement en cours..." : "Payer maintenant"}
              onPress={handlePayment}
              style={styles.payButton}
              disabled={isLoading}
            />
          </View>

          <View style={styles.securityNotice}>
            <Ionicons name="shield-checkmark" size={20} color="#4CAF50" />
            <Text style={styles.securityText}>
              Paiement sécurisé via Moov Flooz. Vos informations sont protégées.
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
    color: "#00A1E0",
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
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
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
  payButton: {
    marginTop: 8,
    backgroundColor: "#00A1E0",
  },
  securityNotice: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f8e9",
    borderRadius: 8,
    padding: 12,
    marginBottom: 24,
  },
  securityText: {
    fontSize: 14,
    color: "#4CAF50",
    marginLeft: 8,
    flex: 1,
  },
});
