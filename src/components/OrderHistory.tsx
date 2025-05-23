import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Card } from "./Card";

export interface Order {
  id: string;
  date: string;
  total: number;
  status: "completed" | "processing" | "shipped" | "cancelled";
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
}

interface OrderHistoryProps {
  orders: Order[];
  onOrderPress?: (orderId: string) => void;
}

export const OrderHistory: React.FC<OrderHistoryProps> = ({
  orders,
  onOrderPress,
}) => {
  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "completed":
        return "#4CAF50";
      case "processing":
        return "#2196F3";
      case "shipped":
        return "#FF9800";
      case "cancelled":
        return "#F44336";
      default:
        return "#757575";
    }
  };

  const getStatusText = (status: Order["status"]) => {
    switch (status) {
      case "completed":
        return "Terminée";
      case "processing":
        return "En traitement";
      case "shipped":
        return "Expédiée";
      case "cancelled":
        return "Annulée";
      default:
        return status;
    }
  };

  const renderOrderItem = ({ item }: { item: Order }) => (
    <Card
      style={styles.orderCard}
      onPress={() => onOrderPress && onOrderPress(item.id)}
    >
      <View style={styles.orderHeader}>
        <View>
          <Text style={styles.orderId}>Commande #{item.id}</Text>
          <Text style={styles.orderDate}>{item.date}</Text>
        </View>
        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(item.status) },
            ]}
          >
            <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.orderSummary}>
        <Text style={styles.itemCount}>
          {item.items.length} article{item.items.length > 1 ? "s" : ""}
        </Text>
        <Text style={styles.orderTotal}>{item.total.toFixed(2)} FCFA</Text>
      </View>

      <View style={styles.orderItems}>
        {item.items.slice(0, 2).map((orderItem, index) => (
          <View key={index} style={styles.orderItem}>
            <Text style={styles.productName} numberOfLines={1}>
              {orderItem.quantity}x {orderItem.productName}
            </Text>
            <Text style={styles.productPrice}>
              {orderItem.price.toFixed(2)} FCFA
            </Text>
          </View>
        ))}
        {item.items.length > 2 && (
          <Text style={styles.moreItems}>
            +{item.items.length - 2} article
            {item.items.length - 2 > 1 ? "s" : ""} supplémentaire
            {item.items.length - 2 > 1 ? "s" : ""}
          </Text>
        )}
      </View>

      <View style={styles.viewDetailsContainer}>
        <Text style={styles.viewDetailsText}>Voir les détails</Text>
        <Ionicons name="chevron-forward" size={16} color="#FF2A2A" />
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="receipt-outline" size={64} color="#ccc" />
          <Text style={styles.emptyText}>Aucune commande</Text>
          <Text style={styles.emptySubtext}>
            Vos commandes apparaîtront ici
          </Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={renderOrderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 16,
  },
  orderCard: {
    marginBottom: 12,
    padding: 16,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  orderId: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  orderDate: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  statusContainer: {
    alignItems: "flex-end",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  orderSummary: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    marginBottom: 12,
  },
  itemCount: {
    fontSize: 14,
    color: "#666",
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF2A2A",
  },
  orderItems: {
    marginBottom: 12,
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  productName: {
    fontSize: 14,
    color: "#333",
    flex: 1,
  },
  productPrice: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  moreItems: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
    marginTop: 4,
  },
  viewDetailsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  viewDetailsText: {
    fontSize: 14,
    color: "#FF2A2A",
    fontWeight: "500",
    marginRight: 4,
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
    color: "#333",
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 8,
  },
});
