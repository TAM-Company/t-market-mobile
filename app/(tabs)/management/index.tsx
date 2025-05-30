import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../../../src/components/Header";

interface ManagementOption {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
  color: string;
}

const managementOptions: ManagementOption[] = [
  {
    id: "orders",
    title: "Commandes",
    description: "Gérer les commandes clients",
    icon: "receipt-outline",
    route: "/management/orders",
    color: "#FF9800",
  },
  {
    id: "inventory",
    title: "Inventaire",
    description: "Gérer le stock des produits",
    icon: "cube-outline",
    route: "/management/inventory",
    color: "#4CAF50",
  },
  {
    id: "analytics",
    title: "Analyses",
    description: "Voir les statistiques et rapports",
    icon: "analytics-outline",
    route: "/management/analytics",
    color: "#9C27B0",
  },
];

export default function ManagementScreen() {
  const router = useRouter();

  const handleOptionPress = (route: string) => {
    router.push(route as any);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title="Gestion" showCartButton />
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Tableau de Bord</Text>
          <Text style={styles.subtitle}>
            Gérez efficacement votre activité commerciale
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="trending-up" size={24} color="#4CAF50" />
            <Text style={styles.statValue}>+15%</Text>
            <Text style={styles.statLabel}>Ventes ce mois</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="people" size={24} color="#2196F3" />
            <Text style={styles.statValue}>1,234</Text>
            <Text style={styles.statLabel}>Clients actifs</Text>
          </View>
        </View>

        <View style={styles.optionsContainer}>
          <Text style={styles.sectionTitle}>Outils de Gestion</Text>
          {managementOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[styles.optionCard, { borderLeftColor: option.color }]}
              onPress={() => handleOptionPress(option.route)}
            >
              <View style={styles.optionContent}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: option.color },
                  ]}
                >
                  <Ionicons name={option.icon as any} size={24} color="#fff" />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.optionTitle}>{option.title}</Text>
                  <Text style={styles.optionDescription}>
                    {option.description}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#ccc" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Actions Rapides</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity style={styles.quickActionCard}>
              <Ionicons name="add-circle-outline" size={32} color="#4CAF50" />
              <Text style={styles.quickActionText}>Nouveau Produit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <Ionicons
                name="document-text-outline"
                size={32}
                color="#FF9800"
              />
              <Text style={styles.quickActionText}>Rapport</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    padding: 20,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    lineHeight: 22,
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
    textAlign: "center",
  },
  optionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  optionCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  quickActions: {
    paddingHorizontal: 20,
  },
  quickActionsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quickActionCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    flex: 0.48,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  quickActionText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
});
