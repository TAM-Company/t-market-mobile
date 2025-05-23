import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../src/components/Button";
import { Header } from "../../src/components/Header";

export default function PaymentConfirmationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    method: string;
    amount: string;
    phone: string;
  }>();

  const { method, amount, phone } = params;

  // Générer un numéro de transaction aléatoire
  const transactionId = `TRX-${Math.floor(Math.random() * 1000000)}`;
  const date = new Date().toLocaleDateString("fr-FR");
  const time = new Date().toLocaleTimeString("fr-FR");

  const handleContinueShopping = () => {
    router.push("/products");
  };

  const handleViewOrders = () => {
    // Rediriger vers la page des commandes (à implémenter)
    router.push("/");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title="Confirmation" showBackButton={false} />
      <ScrollView style={styles.container}>
        <View style={styles.successCard}>
          <View style={styles.iconContainer}>
            <Ionicons name="checkmark-circle" size={80} color="#4CAF50" />
          </View>
          <Text style={styles.successTitle}>Paiement réussi !</Text>
          <Text style={styles.successMessage}>
            Votre commande a été confirmée et sera traitée rapidement.
          </Text>
        </View>

        <View style={styles.detailsCard}>
          <Text style={styles.detailsTitle}>Détails de la transaction</Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Méthode de paiement:</Text>
            <Text style={styles.detailValue}>
              {method || "Wave Côte d'Ivoire"}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Montant:</Text>
            <Text style={styles.detailValue}>{amount || "0.00"} €</Text>
          </View>

          {phone && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Numéro de téléphone:</Text>
              <Text style={styles.detailValue}>+225 {phone}</Text>
            </View>
          )}

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date:</Text>
            <Text style={styles.detailValue}>{date}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Heure:</Text>
            <Text style={styles.detailValue}>{time}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>N° de transaction:</Text>
            <Text style={styles.detailValue}>{transactionId}</Text>
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          <Button
            title="Continuer les achats"
            onPress={handleContinueShopping}
            style={styles.continueButton}
          />
          <TouchableOpacity
            style={styles.viewOrdersButton}
            onPress={handleViewOrders}
          >
            <Text style={styles.viewOrdersText}>Voir mes commandes</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.supportContainer}>
          <Text style={styles.supportTitle}>Besoin d'aide ?</Text>
          <Text style={styles.supportText}>
            Si vous avez des questions concernant votre commande, n'hésitez pas
            à contacter notre service client.
          </Text>
          <TouchableOpacity style={styles.supportButton}>
            <Ionicons name="mail" size={16} color="#FF2A2A" />
            <Text style={styles.supportButtonText}>Contacter le support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 16,
  },
  successCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  successMessage: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  detailsCard: {
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
  detailsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  detailLabel: {
    fontSize: 14,
    color: "#666",
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  buttonsContainer: {
    marginBottom: 24,
  },
  continueButton: {
    marginBottom: 12,
  },
  viewOrdersButton: {
    alignItems: "center",
    padding: 12,
  },
  viewOrdersText: {
    fontSize: 16,
    color: "#FF2A2A",
    fontWeight: "600",
  },
  supportContainer: {
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
  supportTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  supportText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  supportButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "#FF2A2A",
    borderRadius: 8,
  },
  supportButtonText: {
    fontSize: 14,
    color: "#FF2A2A",
    fontWeight: "600",
    marginLeft: 8,
  },
});
