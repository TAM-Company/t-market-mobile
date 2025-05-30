import { categories, products as initialProducts } from "@/src/data/mockData";
import { Product } from "@/src/types";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
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

interface NewProduct {
  name: string;
  description: string;
  price: string;
  stock: string;
  category: string;
}

export default function InventoryScreen() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editedStock, setEditedStock] = useState<string>("");
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [editedPrice, setEditedPrice] = useState<string>("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [showLowStock, setShowLowStock] = useState(false);
  const [newProduct, setNewProduct] = useState<NewProduct>({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

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

  const handleEditPrice = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      setEditingPriceId(productId);
      setEditedPrice(product.price.toString());
    }
  };

  const handleSavePrice = (productId: string) => {
    const newPrice = parseFloat(editedPrice);
    if (isNaN(newPrice) || newPrice <= 0) {
      Alert.alert("Erreur", "Veuillez entrer un prix valide");
      return;
    }

    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, price: newPrice } : product
      )
    );
    setEditingPriceId(null);
  };

  const handleAddProduct = () => {
    if (
      !newProduct.name ||
      !newProduct.price ||
      !newProduct.stock ||
      !newProduct.category
    ) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs obligatoires");
      return;
    }

    const price = parseFloat(newProduct.price);
    const stock = parseInt(newProduct.stock);

    if (isNaN(price) || price <= 0) {
      Alert.alert("Erreur", "Veuillez entrer un prix valide");
      return;
    }

    if (isNaN(stock) || stock < 0) {
      Alert.alert("Erreur", "Veuillez entrer un stock valide");
      return;
    }

    const product: Product = {
      id: Date.now().toString(),
      name: newProduct.name,
      description: newProduct.description || "Nouveau produit",
      price,
      stock,
      category: newProduct.category,
      images: [],
      features: [],
      additionalDetails: [],
    };

    setProducts((prev) => [product, ...prev]);
    setNewProduct({
      name: "",
      description: "",
      price: "",
      stock: "",
      category: "",
    });
    setShowAddModal(false);
    Alert.alert("Succès", "Produit ajouté avec succès");
  };

  const handleDeleteProduct = (productId: string) => {
    Alert.alert(
      "Confirmer la suppression",
      "Êtes-vous sûr de vouloir supprimer ce produit ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () => {
            setProducts((prev) => prev.filter((p) => p.id !== productId));
          },
        },
      ]
    );
  };

  const getFilteredProducts = () => {
    let filtered = products;

    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (showLowStock) {
      filtered = filtered.filter((product) => product.stock <= 5);
    }

    return filtered;
  };

  const getStatistics = () => {
    const totalProducts = products.length;
    const lowStockProducts = products.filter((p) => p.stock <= 5).length;
    const outOfStockProducts = products.filter((p) => p.stock === 0).length;
    const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);

    return { totalProducts, lowStockProducts, outOfStockProducts, totalValue };
  };

  const stats = getStatistics();
  const filteredProducts = getFilteredProducts();

  const renderItem = ({ item }: { item: Product }) => {
    const isEditingStock = editingProductId === item.id;
    const isEditingPrice = editingPriceId === item.id;

    return (
      <View style={styles.productItem}>
        <View style={styles.productInfo}>
          <Text style={styles.productName} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.productCategory}>Catégorie: {item.category}</Text>

          <View style={styles.priceContainer}>
            {isEditingPrice ? (
              <View style={styles.editPriceContainer}>
                <TextInput
                  style={styles.priceInput}
                  value={editedPrice}
                  onChangeText={setEditedPrice}
                  keyboardType="numeric"
                  autoFocus
                />
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={() => handleSavePrice(item.id)}
                >
                  <Ionicons name="checkmark" size={16} color="#fff" />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.priceDisplay}>
                <Text style={styles.productPrice}>
                  {item.price.toFixed(2)} FCFA
                </Text>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => handleEditPrice(item.id)}
                >
                  <Ionicons name="pencil" size={14} color="#FF2A2A" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <View style={styles.stockContainer}>
            {isEditingStock ? (
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
                    item.stock <= 5 && item.stock > 0 && styles.lowStock,
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

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteProduct(item.id)}
          >
            <Ionicons name="trash-outline" size={18} color="#FF2A2A" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Gestion des produits</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowAddModal(true)}
          >
            <Ionicons name="add" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Statistiques */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.totalProducts}</Text>
            <Text style={styles.statLabel}>Produits</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: "#FF9500" }]}>
              {stats.lowStockProducts}
            </Text>
            <Text style={styles.statLabel}>Stock bas</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: "#FF2A2A" }]}>
              {stats.outOfStockProducts}
            </Text>
            <Text style={styles.statLabel}>Rupture</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: "#34C759" }]}>
              {stats.totalValue.toFixed(0)}
            </Text>
            <Text style={styles.statLabel}>Valeur (FCFA)</Text>
          </View>
        </View>

        {/* Filtres */}
        <View style={styles.filtersContainer}>
          <View style={styles.searchContainer}>
            <Ionicons
              name="search"
              size={20}
              color="#666"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filterButtons}
          >
            <TouchableOpacity
              style={[
                styles.filterButton,
                !selectedCategory && !showLowStock && styles.activeFilter,
              ]}
              onPress={() => {
                setSelectedCategory("");
                setShowLowStock(false);
              }}
            >
              <Text
                style={[
                  styles.filterText,
                  !selectedCategory && !showLowStock && styles.activeFilterText,
                ]}
              >
                Tous
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.filterButton, showLowStock && styles.activeFilter]}
              onPress={() => {
                setShowLowStock(!showLowStock);
                setSelectedCategory("");
              }}
            >
              <Text
                style={[
                  styles.filterText,
                  showLowStock && styles.activeFilterText,
                ]}
              >
                Stock bas
              </Text>
            </TouchableOpacity>

            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.filterButton,
                  selectedCategory === category.name && styles.activeFilter,
                ]}
                onPress={() => {
                  setSelectedCategory(
                    selectedCategory === category.name ? "" : category.name
                  );
                  setShowLowStock(false);
                }}
              >
                <Text
                  style={[
                    styles.filterText,
                    selectedCategory === category.name &&
                      styles.activeFilterText,
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />

        {/* Modal d'ajout de produit */}
        <Modal
          visible={showAddModal}
          animationType="slide"
          presentationStyle="pageSheet"
        >
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <Text style={styles.cancelButton}>Annuler</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Nouveau produit</Text>
              <TouchableOpacity onPress={handleAddProduct}>
                <Text style={styles.saveButton}>Ajouter</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalContent}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nom du produit *</Text>
                <TextInput
                  style={styles.textInput}
                  value={newProduct.name}
                  onChangeText={(text) =>
                    setNewProduct((prev) => ({ ...prev, name: text }))
                  }
                  placeholder="Entrez le nom du produit"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Description</Text>
                <TextInput
                  style={[styles.textInput, styles.textArea]}
                  value={newProduct.description}
                  onChangeText={(text) =>
                    setNewProduct((prev) => ({ ...prev, description: text }))
                  }
                  placeholder="Description du produit"
                  multiline
                  numberOfLines={3}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Prix (FCFA) *</Text>
                <TextInput
                  style={styles.textInput}
                  value={newProduct.price}
                  onChangeText={(text) =>
                    setNewProduct((prev) => ({ ...prev, price: text }))
                  }
                  placeholder="0"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Stock initial *</Text>
                <TextInput
                  style={styles.textInput}
                  value={newProduct.stock}
                  onChangeText={(text) =>
                    setNewProduct((prev) => ({ ...prev, stock: text }))
                  }
                  placeholder="0"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Catégorie *</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.categorySelector}>
                    {categories.map((category) => (
                      <TouchableOpacity
                        key={category.id}
                        style={[
                          styles.categoryOption,
                          newProduct.category === category.name &&
                            styles.selectedCategory,
                        ]}
                        onPress={() =>
                          setNewProduct((prev) => ({
                            ...prev,
                            category: category.name,
                          }))
                        }
                      >
                        <Text
                          style={[
                            styles.categoryOptionText,
                            newProduct.category === category.name &&
                              styles.selectedCategoryText,
                          ]}
                        >
                          {category.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>
            </ScrollView>
          </SafeAreaView>
        </Modal>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  addButton: {
    backgroundColor: "#FF2A2A",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
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
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  filtersContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingBottom: 16,
    marginBottom: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  filterButtons: {
    flexDirection: "row",
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginRight: 8,
  },
  activeFilter: {
    backgroundColor: "#FF2A2A",
  },
  filterText: {
    fontSize: 14,
    color: "#666",
  },
  activeFilterText: {
    color: "#fff",
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
    marginBottom: 8,
  },
  priceContainer: {
    marginBottom: 4,
  },
  priceDisplay: {
    flexDirection: "row",
    alignItems: "center",
  },
  productPrice: {
    fontSize: 14,
    color: "#FF2A2A",
    fontWeight: "bold",
    marginRight: 8,
  },
  editPriceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  priceInput: {
    width: 80,
    height: 32,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    paddingHorizontal: 8,
    marginRight: 8,
    textAlign: "center",
    fontSize: 14,
  },
  actionsContainer: {
    alignItems: "flex-end",
  },
  stockContainer: {
    justifyContent: "center",
    alignItems: "center",
    minWidth: 80,
    marginBottom: 8,
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
  lowStock: {
    color: "#FF9500",
  },
  editButton: {
    padding: 4,
  },
  deleteButton: {
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
    color: "#666",
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  categorySelector: {
    flexDirection: "row",
  },
  categoryOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginRight: 8,
  },
  selectedCategory: {
    backgroundColor: "#FF2A2A",
  },
  categoryOptionText: {
    fontSize: 14,
    color: "#666",
  },
  selectedCategoryText: {
    color: "#fff",
  },
});
