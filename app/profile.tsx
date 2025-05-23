import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Card, Header, Input } from "../src/components";
import { Order, OrderHistory } from "../src/components/OrderHistory";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
}

// Données fictives pour l'historique des commandes
const mockOrders: Order[] = [
  {
    id: "ORD-001",
    date: "15/05/2023",
    total: 937000,
    status: "completed",
    items: [
      {
        productId: "1",
        productName: "Smartphone XYZ",
        quantity: 2,
        price: 459000,
      },
      {
        productId: "7",
        productName: "Écouteurs Sans Fil",
        quantity: 1,
        price: 85000,
      },
    ],
  },
  {
    id: "ORD-002",
    date: "03/06/2023",
    total: 590000,
    status: "shipped",
    items: [
      {
        productId: "4",
        productName: "Canapé Moderne",
        quantity: 1,
        price: 590000,
      },
    ],
  },
  {
    id: "ORD-003",
    date: "28/06/2023",
    total: 49000,
    status: "cancelled",
    items: [
      {
        productId: "6",
        productName: "Crème Hydratante Visage",
        quantity: 3,
        price: 16500,
      },
    ],
  },
];

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "orders">("profile");
  const [profile, setProfile] = useState<UserProfile>({
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    phone: "06 12 34 56 78",
    address: "123 Rue de Paris, 75001 Paris",
  });

  const [formData, setFormData] = useState<UserProfile>(profile);
  const [orders] = useState<Order[]>(mockOrders);

  const handleEdit = () => {
    if (isEditing) {
      // Sauvegarder les modifications
      setProfile(formData);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  const handleOrderPress = (orderId: string) => {
    alert(`Détails de la commande ${orderId}`); // À implémenter avec une navigation vers l'écran de détails de commande
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View style={styles.container}>
        <Header title="Mon Profil" showBackButton />

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "profile" && styles.activeTab]}
            onPress={() => setActiveTab("profile")}
          >
            <Ionicons
              name="person-outline"
              size={20}
              color={activeTab === "profile" ? "#FF2A2A" : "#666"}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === "profile" && styles.activeTabText,
              ]}
            >
              Profil
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "orders" && styles.activeTab]}
            onPress={() => setActiveTab("orders")}
          >
            <Ionicons
              name="receipt-outline"
              size={20}
              color={activeTab === "orders" ? "#FF2A2A" : "#666"}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === "orders" && styles.activeTabText,
              ]}
            >
              Commandes
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollContainer}>
          {activeTab === "profile" ? (
            <>
              <View style={styles.profileHeader}>
                <View style={styles.avatarContainer}>
                  <Ionicons name="person-circle" size={100} color="#FF2A2A" />
                </View>
                <Text style={styles.profileName}>{profile.name}</Text>
              </View>

              <Card style={styles.infoCard}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>
                    Informations personnelles
                  </Text>
                  <Button
                    title={isEditing ? "Enregistrer" : "Modifier"}
                    onPress={handleEdit}
                    variant="outline"
                    style={styles.editButton}
                  />
                </View>

                {isEditing ? (
                  <View style={styles.formContainer}>
                    <Input
                      label="Nom"
                      value={formData.name}
                      onChangeText={(text) =>
                        setFormData({ ...formData, name: text })
                      }
                    />
                    <Input
                      label="Email"
                      value={formData.email}
                      onChangeText={(text) =>
                        setFormData({ ...formData, email: text })
                      }
                      keyboardType="email-address"
                    />
                    <Input
                      label="Téléphone"
                      value={formData.phone}
                      onChangeText={(text) =>
                        setFormData({ ...formData, phone: text })
                      }
                      keyboardType="phone-pad"
                    />
                    <Input
                      label="Adresse"
                      value={formData.address}
                      onChangeText={(text) =>
                        setFormData({ ...formData, address: text })
                      }
                      multiline
                    />
                    <Button
                      title="Annuler"
                      onPress={handleCancel}
                      variant="secondary"
                      style={styles.cancelButton}
                    />
                  </View>
                ) : (
                  <View style={styles.infoContainer}>
                    <View style={styles.infoRow}>
                      <Ionicons name="mail-outline" size={20} color="#666" />
                      <Text style={styles.infoText}>{profile.email}</Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Ionicons name="call-outline" size={20} color="#666" />
                      <Text style={styles.infoText}>{profile.phone}</Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Ionicons
                        name="location-outline"
                        size={20}
                        color="#666"
                      />
                      <Text style={styles.infoText}>{profile.address}</Text>
                    </View>
                  </View>
                )}
              </Card>

              <Card style={styles.infoCard}>
                <Text style={styles.sectionTitle}>Paramètres</Text>
                <View style={styles.settingsContainer}>
                  <Button
                    title="Changer le mot de passe"
                    onPress={() => alert("Fonctionnalité à venir")}
                    variant="outline"
                    fullWidth
                    style={styles.settingButton}
                  />
                  <Button
                    title="Notifications"
                    onPress={() => alert("Fonctionnalité à venir")}
                    variant="outline"
                    fullWidth
                    style={styles.settingButton}
                  />
                  <Button
                    title="Confidentialité"
                    onPress={() => alert("Fonctionnalité à venir")}
                    variant="outline"
                    fullWidth
                    style={styles.settingButton}
                  />
                </View>
              </Card>

              <Button
                title="Déconnexion"
                onPress={() => alert("Déconnexion réussie")}
                variant="secondary"
                style={styles.logoutButton}
                textStyle={styles.logoutButtonText}
              />
            </>
          ) : (
            <View style={styles.ordersContainer}>
              <Text style={styles.sectionTitle}>Historique des commandes</Text>
              <OrderHistory orders={orders} onOrderPress={handleOrderPress} />
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    gap: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#FF2A2A",
  },
  tabText: {
    fontSize: 16,
    color: "#666",
  },
  activeTabText: {
    color: "#FF2A2A",
    fontWeight: "600",
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatarContainer: {
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  infoCard: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  ordersContainer: {
    flex: 1,
    marginBottom: 16,
  },
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  infoContainer: {
    marginTop: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
  },
  formContainer: {
    marginTop: 10,
  },
  cancelButton: {
    marginTop: 10,
  },
  settingsContainer: {
    marginTop: 10,
  },
  settingButton: {
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: "#f0f0f0",
    marginTop: 10,
    marginBottom: 30,
  },
  logoutButtonText: {
    color: "#F44336",
  },
});
