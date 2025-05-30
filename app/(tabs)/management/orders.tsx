import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: OrderItem[];
  total: number;
  status:
    | "pending"
    | "confirmed"
    | "preparing"
    | "ready"
    | "delivered"
    | "cancelled";
  paymentMethod: string;
  orderDate: string;
  deliveryDate?: string;
  notes?: string;
}

const mockOrders: Order[] = [
  {
    id: "ORD001",
    customerName: "Kouame Jean",
    customerPhone: "+225 07 12 34 56 78",
    customerAddress: "Cocody, Riviera 3, Rue des Jardins",
    items: [
      { id: "1", productName: "Riz parfumé 25kg", quantity: 2, price: 15000 },
      { id: "2", productName: "Huile de palme 5L", quantity: 1, price: 8500 },
    ],
    total: 38500,
    status: "pending",
    paymentMethod: "MTN Mobile Money",
    orderDate: "2024-01-15T10:30:00Z",
    notes: "Livraison avant 18h",
  },
  {
    id: "ORD002",
    customerName: "Aya Marie",
    customerPhone: "+225 05 98 76 54 32",
    customerAddress: "Yopougon, Selmer, Marché",
    items: [
      { id: "3", productName: "Attiéké 1kg", quantity: 5, price: 2500 },
      { id: "4", productName: "Poisson fumé", quantity: 2, price: 4000 },
    ],
    total: 20500,
    status: "confirmed",
    paymentMethod: "Orange Money",
    orderDate: "2024-01-15T14:20:00Z",
    deliveryDate: "2024-01-16T16:00:00Z",
  },
  {
    id: "ORD003",
    customerName: "Koffi Paul",
    customerPhone: "+225 01 23 45 67 89",
    customerAddress: "Adjamé, 220 logements",
    items: [
      {
        id: "5",
        productName: "Banane plantain (régime)",
        quantity: 1,
        price: 3500,
      },
      { id: "6", productName: "Tomate fraîche 1kg", quantity: 3, price: 1500 },
    ],
    total: 8000,
    status: "ready",
    paymentMethod: "Espèces à la livraison",
    orderDate: "2024-01-14T09:15:00Z",
    deliveryDate: "2024-01-15T15:30:00Z",
  },
];

export default function OrdersScreen() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const statusOptions = [
    { key: "all", label: "Toutes", color: "#666" },
    { key: "pending", label: "En attente", color: "#FF9500" },
    { key: "confirmed", label: "Confirmées", color: "#007AFF" },
    { key: "preparing", label: "Préparation", color: "#5856D6" },
    { key: "ready", label: "Prêtes", color: "#34C759" },
    { key: "delivered", label: "Livrées", color: "#8E8E93" },
    { key: "cancelled", label: "Annulées", color: "#FF2A2A" },
  ];

  const getStatusColor = (status: string) => {
    const statusOption = statusOptions.find((option) => option.key === status);
    return statusOption?.color || "#666";
  };

  const getStatusLabel = (status: string) => {
    const statusOption = statusOptions.find((option) => option.key === status);
    return statusOption?.label || status;
  };

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    setShowOrderModal(false);
  };

  const getFilteredOrders = () => {
    let filtered = orders;

    if (selectedStatus !== "all") {
      filtered = filtered.filter((order) => order.status === selectedStatus);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (order) =>
          order.customerName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.customerPhone.includes(searchQuery)
      );
    }

    return filtered.sort(
      (a, b) =>
        new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
    );
  };

  const getOrderStats = () => {
    const totalOrders = orders.length;
    const pendingOrders = orders.filter((o) => o.status === "pending").length;
    const todayRevenue = orders
      .filter((o) => {
        const orderDate = new Date(o.orderDate);
        const today = new Date();
        return (
          orderDate.toDateString() === today.toDateString() &&
          o.status === "delivered"
        );
      })
      .reduce((sum, o) => sum + o.total, 0);
    const readyOrders = orders.filter((o) => o.status === "ready").length;

    return { totalOrders, pendingOrders, todayRevenue, readyOrders };
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const stats = getOrderStats();
  const filteredOrders = getFilteredOrders();

  const renderOrderItem = ({ item }: { item: Order }) => (
    <TouchableOpacity
      style={styles.orderItem}
      onPress={() => {
        setSelectedOrder(item);
        setShowOrderModal(true);
      }}
    >
      <View style={styles.orderHeader}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderId}>#{item.id}</Text>
          <Text style={styles.customerName}>{item.customerName}</Text>
        </View>
        <View style={styles.orderStatus}>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(item.status) },
            ]}
          >
            <Text style={styles.statusText}>{getStatusLabel(item.status)}</Text>
          </View>
          <Text style={styles.orderTotal}>
            {item.total.toLocaleString()} FCFA
          </Text>
        </View>
      </View>

      <View style={styles.orderDetails}>
        <Text style={styles.orderDate}>{formatDate(item.orderDate)}</Text>
        <Text style={styles.itemCount}>{item.items.length} article(s)</Text>
      </View>

      <Text style={styles.customerPhone}>{item.customerPhone}</Text>
    </TouchableOpacity>
  );

  const renderOrderModal = () => {
    if (!selectedOrder) return null;

    return (
      <Modal
        visible={showOrderModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowOrderModal(false)}>
              <Text style={styles.cancelButton}>Fermer</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Commande #{selectedOrder.id}</Text>
            <View style={{ width: 60 }} />
          </View>

          <ScrollView style={styles.modalContent}>
            {/* Informations client */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Informations client</Text>
              <View style={styles.infoRow}>
                <Ionicons name="person" size={16} color="#666" />
                <Text style={styles.infoText}>
                  {selectedOrder.customerName}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="call" size={16} color="#666" />
                <Text style={styles.infoText}>
                  {selectedOrder.customerPhone}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="location" size={16} color="#666" />
                <Text style={styles.infoText}>
                  {selectedOrder.customerAddress}
                </Text>
              </View>
            </View>

            {/* Articles commandés */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Articles commandés</Text>
              {selectedOrder.items.map((item) => (
                <View key={item.id} style={styles.orderItemDetail}>
                  <Text style={styles.itemName}>{item.productName}</Text>
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemQuantity}>
                      Qté: {item.quantity}
                    </Text>
                    <Text style={styles.itemPrice}>
                      {(item.price * item.quantity).toLocaleString()} FCFA
                    </Text>
                  </View>
                </View>
              ))}
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total:</Text>
                <Text style={styles.totalAmount}>
                  {selectedOrder.total.toLocaleString()} FCFA
                </Text>
              </View>
            </View>

            {/* Informations de livraison */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Livraison & Paiement</Text>
              <View style={styles.infoRow}>
                <Ionicons name="card" size={16} color="#666" />
                <Text style={styles.infoText}>
                  {selectedOrder.paymentMethod}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="time" size={16} color="#666" />
                <Text style={styles.infoText}>
                  Commandé le {formatDate(selectedOrder.orderDate)}
                </Text>
              </View>
              {selectedOrder.deliveryDate && (
                <View style={styles.infoRow}>
                  <Ionicons name="checkmark-circle" size={16} color="#666" />
                  <Text style={styles.infoText}>
                    Livré le {formatDate(selectedOrder.deliveryDate)}
                  </Text>
                </View>
              )}
              {selectedOrder.notes && (
                <View style={styles.infoRow}>
                  <Ionicons name="document-text" size={16} color="#666" />
                  <Text style={styles.infoText}>{selectedOrder.notes}</Text>
                </View>
              )}
            </View>

            {/* Actions de statut */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Changer le statut</Text>
              <View style={styles.statusActions}>
                {statusOptions.slice(1).map((status) => (
                  <TouchableOpacity
                    key={status.key}
                    style={[
                      styles.statusActionButton,
                      selectedOrder.status === status.key &&
                        styles.currentStatusButton,
                    ]}
                    onPress={() =>
                      updateOrderStatus(
                        selectedOrder.id,
                        status.key as Order["status"]
                      )
                    }
                    disabled={selectedOrder.status === status.key}
                  >
                    <Text
                      style={[
                        styles.statusActionText,
                        { color: status.color },
                        selectedOrder.status === status.key &&
                          styles.currentStatusText,
                      ]}
                    >
                      {status.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Gestion des commandes</Text>
      </View>

      {/* Statistiques */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.totalOrders}</Text>
          <Text style={styles.statLabel}>Total commandes</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: "#FF9500" }]}>
            {stats.pendingOrders}
          </Text>
          <Text style={styles.statLabel}>En attente</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: "#34C759" }]}>
            {stats.readyOrders}
          </Text>
          <Text style={styles.statLabel}>Prêtes</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: "#007AFF" }]}>
            {stats.todayRevenue.toLocaleString()}
          </Text>
          <Text style={styles.statLabel}>CA aujourd'hui</Text>
        </View>
      </View>

      {/* Recherche */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#666"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher par nom, téléphone ou ID..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Filtres de statut */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.statusFilters}
      >
        {statusOptions.map((status) => (
          <TouchableOpacity
            key={status.key}
            style={[
              styles.statusFilter,
              selectedStatus === status.key && styles.activeStatusFilter,
            ]}
            onPress={() => setSelectedStatus(status.key)}
          >
            <Text
              style={[
                styles.statusFilterText,
                selectedStatus === status.key && styles.activeStatusFilterText,
              ]}
            >
              {status.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Liste des commandes */}
      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id}
        renderItem={renderOrderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {renderOrderModal()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    backgroundColor: "#fff",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 8,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  statLabel: {
    fontSize: 11,
    color: "#666",
    marginTop: 4,
    textAlign: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  statusFilters: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  statusFilter: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#fff",
    marginRight: 8,
  },
  activeStatusFilter: {
    backgroundColor: "#FF2A2A",
  },
  statusFilterText: {
    fontSize: 14,
    color: "#666",
  },
  activeStatusFilterText: {
    color: "#fff",
  },
  listContent: {
    padding: 16,
  },
  orderItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  customerName: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  orderStatus: {
    alignItems: "flex-end",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 4,
  },
  statusText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
  },
  orderTotal: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FF2A2A",
  },
  orderDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 12,
    color: "#666",
  },
  itemCount: {
    fontSize: 12,
    color: "#666",
  },
  customerPhone: {
    fontSize: 12,
    color: "#007AFF",
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  cancelButton: {
    fontSize: 16,
    color: "#007AFF",
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 8,
    flex: 1,
  },
  orderItemDetail: {
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    paddingBottom: 8,
    marginBottom: 8,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  itemDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemQuantity: {
    fontSize: 12,
    color: "#666",
  },
  itemPrice: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FF2A2A",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF2A2A",
  },
  statusActions: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  statusActionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginRight: 8,
    marginBottom: 8,
  },
  currentStatusButton: {
    backgroundColor: "#e0e0e0",
  },
  statusActionText: {
    fontSize: 14,
    fontWeight: "600",
  },
  currentStatusText: {
    color: "#999",
  },
});