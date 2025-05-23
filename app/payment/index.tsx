import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
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

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  description: string;
  country: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "wave-ci",
    name: "Wave Côte d'Ivoire",
    icon: "https://play-lh.googleusercontent.com/VYvJqGnrQiKkbbyLyMeiL-GM3go_tP5raY_tCxS8Bj6GgKJ8V5FSATwMVjbQVqQFcn0=w240-h480-rw",
    description: "Paiement mobile rapide et sécurisé",
    country: "Côte d'Ivoire",
  },
  {
    id: "orange-money",
    name: "Orange Money",
    icon: "https://play-lh.googleusercontent.com/KbGNsX1bpzT-1DnmQaD0-oXUYI_GaJxf9Z1A_KeaJ_CxG8jYjxFTMlmf6Rv-7SxBKQ=w240-h480-rw",
    description: "Service de paiement mobile par Orange",
    country: "Côte d'Ivoire",
  },
  {
    id: "mtn-momo",
    name: "MTN Mobile Money",
    icon: "https://play-lh.googleusercontent.com/DTzWtkxfnKwFO3ruybY1SKjJQnLYeuK3KmQmwV5OQ3dULr5iXxeEtzBLceultrKTIUTr=w240-h480-rw",
    description: "Transfert d'argent et paiements mobiles",
    country: "Côte d'Ivoire",
  },
  {
    id: "moov-flooz",
    name: "Moov Flooz",
    icon: "https://play-lh.googleusercontent.com/Vn5v1iVaQHY-kQw9aYksBQzC2deZc_LLCDLCkAITjEbGQ_uGYD5_VgHUoWI-k0xwRA=w240-h480-rw",
    description: "Service de paiement mobile par Moov",
    country: "Côte d'Ivoire",
  },
  {
    id: "cash-delivery",
    name: "Paiement à la livraison",
    icon: "https://cdn-icons-png.flaticon.com/512/2331/2331941.png",
    description: "Payez en espèces à la réception de votre commande",
    country: "Tous pays",
  },
];

export default function PaymentMethodsScreen() {
  const router = useRouter();
  const { getCartTotal } = useCart();

  const handlePaymentMethodSelect = (methodId: string) => {
    router.push(`/payment/${methodId}`);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title="Méthodes de paiement" showBackButton />
      <ScrollView style={styles.container}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Montant total à payer:</Text>
          <Text style={styles.totalAmount}>
            {getCartTotal().toFixed(2)} FCFA
          </Text>
        </View>

        <Text style={styles.sectionTitle}>
          Choisissez votre méthode de paiement
        </Text>

        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={styles.paymentMethodCard}
            onPress={() => handlePaymentMethodSelect(method.id)}
          >
            <Image
              source={{ uri: method.icon }}
              style={styles.paymentMethodIcon}
            />
            <View style={styles.paymentMethodInfo}>
              <Text style={styles.paymentMethodName}>{method.name}</Text>
              <Text style={styles.paymentMethodDescription}>
                {method.description}
              </Text>
              <Text style={styles.paymentMethodCountry}>{method.country}</Text>
            </View>
            <View style={styles.arrowContainer}>
              <Ionicons name="chevron-forward" size={24} color="#888" />
            </View>
          </TouchableOpacity>
        ))}
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
  totalContainer: {
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
  totalLabel: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF2A2A",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  paymentMethodCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  paymentMethodIcon: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  paymentMethodInfo: {
    flex: 1,
    marginLeft: 16,
  },
  paymentMethodName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  paymentMethodDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  paymentMethodCountry: {
    fontSize: 12,
    color: "#888",
  },
  arrowContainer: {
    paddingLeft: 8,
  },
});
