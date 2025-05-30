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
import { Header } from "../../src/components/Header";

interface HelpSection {
  id: string;
  title: string;
  icon: string;
  description: string;
  items: string[];
}

const helpSections: HelpSection[] = [
  {
    id: "orders",
    title: "Commandes",
    icon: "receipt-outline",
    description: "Tout sur vos commandes",
    items: [
      "Comment passer une commande",
      "Suivre ma commande",
      "Modifier ou annuler une commande",
      "Problème avec ma commande",
    ],
  },
  {
    id: "payment",
    title: "Paiement",
    icon: "card-outline",
    description: "Modes de paiement et facturation",
    items: [
      "Modes de paiement acceptés",
      "Paiement mobile money",
      "Problème de paiement",
      "Remboursement",
    ],
  },
  {
    id: "delivery",
    title: "Livraison",
    icon: "bicycle-outline",
    description: "Informations sur la livraison",
    items: [
      "Zones de livraison",
      "Délais de livraison",
      "Frais de livraison",
      "Livraison express",
    ],
  },
  {
    id: "account",
    title: "Mon Compte",
    icon: "person-outline",
    description: "Gestion de votre compte",
    items: [
      "Créer un compte",
      "Modifier mes informations",
      "Mot de passe oublié",
      "Supprimer mon compte",
    ],
  },
];

export default function AideScreen() {
  const router = useRouter();
  const [expandedSection, setExpandedSection] = React.useState<string | null>(
    null
  );

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title="Centre d'Aide" showBackButton />
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Comment pouvons-nous vous aider ?</Text>
          <Text style={styles.subtitle}>
            Trouvez rapidement les réponses à vos questions
          </Text>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={20} color="#666" />
            <Text style={styles.searchPlaceholder}>
              Rechercher dans l'aide...
            </Text>
          </View>
        </View>

        <View style={styles.sectionsContainer}>
          {helpSections.map((section) => (
            <View key={section.id} style={styles.sectionCard}>
              <TouchableOpacity
                style={styles.sectionHeader}
                onPress={() => toggleSection(section.id)}
              >
                <View style={styles.sectionInfo}>
                  <View style={styles.iconContainer}>
                    <Ionicons
                      name={section.icon as any}
                      size={24}
                      color="#FF2A2A"
                    />
                  </View>
                  <View style={styles.sectionText}>
                    <Text style={styles.sectionTitle}>{section.title}</Text>
                    <Text style={styles.sectionDescription}>
                      {section.description}
                    </Text>
                  </View>
                </View>
                <Ionicons
                  name={
                    expandedSection === section.id
                      ? "chevron-up"
                      : "chevron-down"
                  }
                  size={20}
                  color="#666"
                />
              </TouchableOpacity>

              {expandedSection === section.id && (
                <View style={styles.sectionContent}>
                  {section.items.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.helpItem}>
                      <Text style={styles.helpItemText}>{item}</Text>
                      <Ionicons name="chevron-forward" size={16} color="#999" />
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>

        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>
            Besoin d'aide supplémentaire ?
          </Text>
          <TouchableOpacity style={styles.contactButton}>
            <Ionicons name="chatbubble-outline" size={20} color="#fff" />
            <Text style={styles.contactButtonText}>Contacter le support</Text>
          </TouchableOpacity>
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
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    gap: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchPlaceholder: {
    color: "#666",
    fontSize: 16,
  },
  sectionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  sectionInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFE5E5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  sectionText: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 14,
    color: "#666",
  },
  sectionContent: {
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  helpItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  helpItemText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  contactSection: {
    padding: 20,
    alignItems: "center",
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF2A2A",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    gap: 8,
  },
  contactButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
