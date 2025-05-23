import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "../../src/components/Card";
import { Header } from "../../src/components/Header";

interface UserAddress {
  id: string;
  title: string;
  address: string;
  isDefault: boolean;
}

interface PaymentMethod {
  id: string;
  type: string;
  lastDigits: string;
  expiryDate: string;
  isDefault: boolean;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
  items: number;
  trackingSteps?: {
    title: string;
    date: string;
    completed: boolean;
  }[];
}

export default function ProfileScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("personal");
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [trackingModalVisible, setTrackingModalVisible] =
    useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [editField, setEditField] = useState<string>("");
  const [editValue, setEditValue] = useState<string>("");

  // Données fictives pour l'utilisateur
  const [userData, setUserData] = useState({
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    phone: "+33 6 12 34 56 78",
  });

  // Données fictives pour les adresses
  const [addresses, setAddresses] = useState<UserAddress[]>([
    {
      id: "1",
      title: "Domicile",
      address: "123 Rue de Paris, 75001 Paris, France",
      isDefault: true,
    },
    {
      id: "2",
      title: "Bureau",
      address: "45 Avenue des Champs-Élysées, 75008 Paris, France",
      isDefault: false,
    },
  ]);

  // Données fictives pour les méthodes de paiement
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      type: "Visa",
      lastDigits: "4567",
      expiryDate: "05/25",
      isDefault: true,
    },
    {
      id: "2",
      type: "Mastercard",
      lastDigits: "8901",
      expiryDate: "12/24",
      isDefault: false,
    },
  ]);

  // Données fictives pour l'historique des commandes
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-001",
      date: "15/05/2023",
      total: 125.99,
      status: "Livrée",
      items: 3,
      trackingSteps: [
        {
          title: "Commande confirmée",
          date: "15/05/2023 08:30",
          completed: true,
        },
        { title: "En préparation", date: "15/05/2023 09:45", completed: true },
        { title: "Expédiée", date: "15/05/2023 14:20", completed: true },
        { title: "En livraison", date: "15/05/2023 16:30", completed: true },
        { title: "Livrée", date: "15/05/2023 18:15", completed: true },
      ],
    },
    {
      id: "ORD-002",
      date: "02/06/2023",
      total: 89.5,
      status: "En cours",
      items: 2,
      trackingSteps: [
        {
          title: "Commande confirmée",
          date: "02/06/2023 10:15",
          completed: true,
        },
        { title: "En préparation", date: "02/06/2023 14:30", completed: true },
        { title: "Expédiée", date: "03/06/2023 09:00", completed: true },
        { title: "En livraison", date: "03/06/2023 14:45", completed: false },
        { title: "Livrée", date: "", completed: false },
      ],
    },
    {
      id: "ORD-003",
      date: "18/06/2023",
      total: 210.75,
      status: "En préparation",
      items: 4,
      trackingSteps: [
        {
          title: "Commande confirmée",
          date: "18/06/2023 11:20",
          completed: true,
        },
        { title: "En préparation", date: "18/06/2023 15:45", completed: true },
        { title: "Expédiée", date: "", completed: false },
        { title: "En livraison", date: "", completed: false },
        { title: "Livrée", date: "", completed: false },
      ],
    },
  ]);

  const openEditModal = (field: string, value: string) => {
    setEditField(field);
    setEditValue(value);
    setEditModalVisible(true);
  };

  const saveEdit = () => {
    if (
      editField === "name" ||
      editField === "email" ||
      editField === "phone"
    ) {
      setUserData({ ...userData, [editField]: editValue });
    }
    setEditModalVisible(false);
  };

  const renderPersonalInfo = () => (
    <View style={styles.sectionContainer}>
      <Card style={styles.infoCard}>
        <View style={styles.infoRow}>
          <View style={styles.infoLabelContainer}>
            <Ionicons name="person-outline" size={20} color="#555" />
            <Text style={styles.infoLabel}>Nom</Text>
          </View>
          <View style={styles.infoValueContainer}>
            <Text style={styles.infoValue}>{userData.name}</Text>
            <TouchableOpacity
              onPress={() => openEditModal("name", userData.name)}
            >
              <Ionicons name="pencil-outline" size={18} color="#FF2A2A" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <View style={styles.infoLabelContainer}>
            <Ionicons name="mail-outline" size={20} color="#555" />
            <Text style={styles.infoLabel}>Email</Text>
          </View>
          <View style={styles.infoValueContainer}>
            <Text style={styles.infoValue}>{userData.email}</Text>
            <TouchableOpacity
              onPress={() => openEditModal("email", userData.email)}
            >
              <Ionicons name="pencil-outline" size={18} color="#FF2A2A" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <View style={styles.infoLabelContainer}>
            <Ionicons name="call-outline" size={20} color="#555" />
            <Text style={styles.infoLabel}>Téléphone</Text>
          </View>
          <View style={styles.infoValueContainer}>
            <Text style={styles.infoValue}>{userData.phone}</Text>
            <TouchableOpacity
              onPress={() => openEditModal("phone", userData.phone)}
            >
              <Ionicons name="pencil-outline" size={18} color="#FF2A2A" />
            </TouchableOpacity>
          </View>
        </View>
      </Card>

      <TouchableOpacity style={styles.logoutButton}>
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.logoutButtonText}>Déconnexion</Text>
      </TouchableOpacity>
    </View>
  );

  const renderAddresses = () => (
    <View style={styles.sectionContainer}>
      {addresses.map((address) => (
        <Card key={address.id} style={styles.addressCard}>
          <View style={styles.addressHeader}>
            <View style={styles.addressTitleContainer}>
              <Text style={styles.addressTitle}>{address.title}</Text>
              {address.isDefault && (
                <View style={styles.defaultBadge}>
                  <Text style={styles.defaultBadgeText}>Par défaut</Text>
                </View>
              )}
            </View>
            <TouchableOpacity>
              <Ionicons name="pencil-outline" size={18} color="#FF2A2A" />
            </TouchableOpacity>
          </View>
          <Text style={styles.addressText}>{address.address}</Text>
        </Card>
      ))}

      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add-circle-outline" size={20} color="#FF2A2A" />
        <Text style={styles.addButtonText}>Ajouter une adresse</Text>
      </TouchableOpacity>
    </View>
  );

  const renderPaymentMethods = () => (
    <View style={styles.sectionContainer}>
      {paymentMethods.map((method) => (
        <Card key={method.id} style={styles.paymentCard}>
          <View style={styles.paymentHeader}>
            <View style={styles.paymentTitleContainer}>
              <Ionicons
                name={method.type === "Visa" ? "card-outline" : "card-outline"}
                size={24}
                color="#555"
              />
              <View>
                <Text style={styles.paymentTitle}>
                  {method.type} •••• {method.lastDigits}
                </Text>
                <Text style={styles.paymentExpiry}>
                  Expire le {method.expiryDate}
                </Text>
              </View>
            </View>
            {method.isDefault && (
              <View style={styles.defaultBadge}>
                <Text style={styles.defaultBadgeText}>Par défaut</Text>
              </View>
            )}
          </View>
        </Card>
      ))}

      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add-circle-outline" size={20} color="#FF2A2A" />
        <Text style={styles.addButtonText}>Ajouter un moyen de paiement</Text>
      </TouchableOpacity>
    </View>
  );

  const renderOrders = () => (
    <View style={styles.sectionContainer}>
      {orders.map((order) => (
        <Card key={order.id} style={styles.orderCard}>
          <View style={styles.orderHeader}>
            <Text style={styles.orderId}>{order.id}</Text>
            <View
              style={[
                styles.orderStatusBadge,
                {
                  backgroundColor:
                    order.status === "Livrée"
                      ? "#4CAF50"
                      : order.status === "En cours"
                      ? "#2196F3"
                      : "#FF9800",
                },
              ]}
            >
              <Text style={styles.orderStatusText}>{order.status}</Text>
            </View>
          </View>

          <View style={styles.orderDetails}>
            <View style={styles.orderDetail}>
              <Text style={styles.orderDetailLabel}>Date</Text>
              <Text style={styles.orderDetailValue}>{order.date}</Text>
            </View>

            <View style={styles.orderDetail}>
              <Text style={styles.orderDetailLabel}>Articles</Text>
              <Text style={styles.orderDetailValue}>{order.items}</Text>
            </View>

            <View style={styles.orderDetail}>
              <Text style={styles.orderDetailLabel}>Total</Text>
              <Text style={styles.orderDetailValue}>
                {order.total.toFixed(2)} €
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.viewOrderButton}>
            <Text style={styles.viewOrderButtonText}>Voir les détails</Text>
            <Ionicons name="chevron-forward" size={16} color="#FF2A2A" />
          </TouchableOpacity>
        </Card>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title="Profil" showCartButton />
      <ScrollView style={styles.container}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={64} color="#fff" />
          </View>
          <Text style={styles.profileName}>{userData.name}</Text>
          <Text style={styles.profileEmail}>{userData.email}</Text>
        </View>

        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "personal" && styles.activeTab]}
            onPress={() => setActiveTab("personal")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "personal" && styles.activeTabText,
              ]}
            >
              Personnel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "orders" && styles.activeTab]}
            onPress={() => setActiveTab("orders")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "orders" && styles.activeTabText,
              ]}
            >
              Commandes
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "addresses" && styles.activeTab]}
            onPress={() => setActiveTab("addresses")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "addresses" && styles.activeTabText,
              ]}
            >
              Adresses
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "payment" && styles.activeTab]}
            onPress={() => setActiveTab("payment")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "payment" && styles.activeTabText,
              ]}
            >
              Paiement
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === "personal" && renderPersonalInfo()}
        {activeTab === "orders" && renderOrders()}
        {activeTab === "addresses" && renderAddresses()}
        {activeTab === "payment" && renderPaymentMethods()}
      </ScrollView>

      <Modal
        visible={editModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              Modifier{" "}
              {editField === "name"
                ? "le nom"
                : editField === "email"
                ? "l'email"
                : "le téléphone"}
            </Text>
            <TextInput
              style={styles.modalInput}
              value={editValue}
              onChangeText={setEditValue}
              autoCapitalize="none"
              keyboardType={
                editField === "email"
                  ? "email-address"
                  : editField === "phone"
                  ? "phone-pad"
                  : "default"
              }
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalCancelButton]}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={styles.modalCancelButtonText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalSaveButton]}
                onPress={saveEdit}
              >
                <Text style={styles.modalSaveButtonText}>Enregistrer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  profileHeader: {
    backgroundColor: "#FF2A2A",
    paddingVertical: 30,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
  },
  tabsContainer: {
    flexDirection: "row",
    marginTop: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#FF2A2A",
  },
  tabText: {
    fontSize: 14,
    color: "#888",
  },
  activeTabText: {
    color: "#FF2A2A",
    fontWeight: "600",
  },
  sectionContainer: {
    padding: 16,
  },
  infoCard: {
    padding: 0,
    overflow: "hidden",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  infoLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 16,
    color: "#555",
    marginLeft: 8,
  },
  infoValueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoValue: {
    fontSize: 16,
    color: "#333",
    marginRight: 8,
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
  },
  logoutButton: {
    backgroundColor: "#FF2A2A",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 24,
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 8,
  },
  addressCard: {
    padding: 16,
  },
  addressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  addressTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
  addressText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
  defaultBadge: {
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 4,
  },
  defaultBadgeText: {
    fontSize: 12,
    color: "#4CAF50",
    fontWeight: "500",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    marginTop: 8,
  },
  addButtonText: {
    color: "#FF2A2A",
    fontWeight: "600",
    marginLeft: 8,
  },
  paymentCard: {
    padding: 16,
  },
  paymentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paymentTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  paymentExpiry: {
    fontSize: 14,
    color: "#777",
    marginLeft: 8,
  },
  orderCard: {
    padding: 16,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  orderId: {
    fontSize: 16,
    fontWeight: "600",
  },
  orderStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  orderStatusText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "500",
  },
  orderDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  orderDetail: {},
  orderDetailLabel: {
    fontSize: 12,
    color: "#777",
    marginBottom: 4,
  },
  orderDetailValue: {
    fontSize: 14,
    fontWeight: "500",
  },
  viewOrderButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  viewOrderButtonText: {
    fontSize: 14,
    color: "#FF2A2A",
    fontWeight: "500",
    marginRight: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  modalCancelButton: {
    backgroundColor: "#f1f1f1",
    marginRight: 8,
  },
  modalCancelButtonText: {
    color: "#555",
    fontWeight: "600",
  },
  modalSaveButton: {
    backgroundColor: "#FF2A2A",
    marginLeft: 8,
  },
  modalSaveButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
