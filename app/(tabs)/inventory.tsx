import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { products as initialProducts } from "../../src/data/mockData";
import { Product } from "../../src/types";

export default function InventoryScreen() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editedStock, setEditedStock] = useState<string>("");

  const handleEditStock = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      setEditingProductId(productId);
      setEditedStock(product.stock.toString());
    }
  };

  const handleSaveStock = (productId: string) => {
    const newStock = parseInt(editedStock);
    if (isNaN(newStock) || newStock < 0) {
      Alert.alert("Erreur", "Veuillez entrer un nombre valide");
      return;
    }

    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, stock: newStock } : product
      )
    );
    setEditingProductId(null);
  };

  const renderItem = ({ item }: { item: Product }) => {
    const isEditing = editingProductId === item.id;

    return (
      <View style={styles.productItem}>
        <View style={styles.productInfo}>
          <Text style={styles.productName} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.productCategory}>Catégorie: {item.category}</Text>
          <Text style={styles.productPrice}>{item.price.toFixed(2)} FCFA</Text>
        </View>

        <View style={styles.stockContainer}>
          {isEditing ? (
            <View style={styles.editStockContainer}>
              <TextInput
                style={styles.stockInput}
                value={editedStock}
                onChangeText={setEditedStock}
                keyboardType="numeric"
                autoFocus
              />
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => handleSaveStock(item.id)}
              >
                <Ionicons name="checkmark" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.stockDisplay}>
              <Text
                style={[
                  styles.stockText,
                  item.stock === 0 && styles.outOfStock,
                ]}
              >
                {item.stock}
              </Text>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEditStock(item.id)}
              >
                <Ionicons name="pencil" size={18} color="#FF2A2A" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Gestion des produits</Text>
        </View>

        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      </View>
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
  listContent: {
    padding: 16,
  },
  productItem: {
    flexDirection: "row",
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
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: "#FF2A2A",
    fontWeight: "bold",
  },
  stockContainer: {
    justifyContent: "center",
    alignItems: "center",
    minWidth: 80,
  },
  stockDisplay: {
    flexDirection: "row",
    alignItems: "center",
  },
  stockText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginRight: 8,
  },
  outOfStock: {
    color: "#FF2A2A",
  },
  editButton: {
    padding: 4,
  },
  editStockContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  stockInput: {
    width: 50,
    height: 36,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    paddingHorizontal: 8,
    marginRight: 8,
    textAlign: "center",
  },
  saveButton: {
    backgroundColor: "#FF2A2A",
    borderRadius: 4,
    padding: 6,
  },
});
