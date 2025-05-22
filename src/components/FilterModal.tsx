import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { categories } from "../data/mockData";
import { FilterOptions } from "../types";

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  currentFilters: FilterOptions;
  onApplyFilters: (filters: FilterOptions) => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  currentFilters,
  onApplyFilters,
}) => {
  const [filters, setFilters] = useState<FilterOptions>(currentFilters);

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters: FilterOptions = {
      searchQuery: "",
      category: "",
      minPrice: null,
      maxPrice: null,
      inStock: false,
    };
    setFilters(resetFilters);
    onApplyFilters(resetFilters);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Filtres avancés</Text>

          <ScrollView style={styles.scrollView}>
            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>Recherche</Text>
              <TextInput
                style={styles.input}
                placeholder="Rechercher un produit..."
                value={filters.searchQuery}
                onChangeText={(text) =>
                  setFilters({ ...filters, searchQuery: text })
                }
              />
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>Catégorie</Text>
              <View style={styles.categoriesContainer}>
                <TouchableOpacity
                  style={[
                    styles.categoryButton,
                    filters.category === "" && styles.selectedCategory,
                  ]}
                  onPress={() => setFilters({ ...filters, category: "" })}
                >
                  <Text style={styles.categoryText}>Toutes</Text>
                </TouchableOpacity>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    style={[
                      styles.categoryButton,
                      filters.category === category.id &&
                        styles.selectedCategory,
                    ]}
                    onPress={() =>
                      setFilters({ ...filters, category: category.id })
                    }
                  >
                    <Text style={styles.categoryText}>{category.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>Prix</Text>
              <View style={styles.priceContainer}>
                <TextInput
                  style={[styles.input, styles.priceInput]}
                  placeholder="Min"
                  keyboardType="numeric"
                  value={
                    filters.minPrice !== null ? filters.minPrice.toString() : ""
                  }
                  onChangeText={(text) => {
                    const value = text.trim() === "" ? null : parseFloat(text);
                    setFilters({ ...filters, minPrice: value });
                  }}
                />
                <Text style={styles.priceSeparator}>à</Text>
                <TextInput
                  style={[styles.input, styles.priceInput]}
                  placeholder="Max"
                  keyboardType="numeric"
                  value={
                    filters.maxPrice !== null ? filters.maxPrice.toString() : ""
                  }
                  onChangeText={(text) => {
                    const value = text.trim() === "" ? null : parseFloat(text);
                    setFilters({ ...filters, maxPrice: value });
                  }}
                />
              </View>
            </View>

            <View style={styles.filterSection}>
              <View style={styles.stockContainer}>
                <Text style={styles.sectionTitle}>
                  Produits en stock uniquement
                </Text>
                <Switch
                  value={filters.inStock}
                  onValueChange={(value) =>
                    setFilters({ ...filters, inStock: value })
                  }
                  trackColor={{ false: "#767577", true: "#FF2A2A" }}
                  thumbColor={filters.inStock ? "#fff" : "#f4f3f4"}
                />
              </View>
            </View>
          </ScrollView>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
              <Text style={styles.resetButtonText}>Réinitialiser</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.applyButtonText}>Appliquer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: "80%",
  },
  scrollView: {
    flex: 1,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  filterSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -5,
  },
  categoryButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 5,
  },
  selectedCategory: {
    backgroundColor: "#FF2A2A",
    borderColor: "#FF2A2A",
  },
  categoryText: {
    color: "#333",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  priceInput: {
    flex: 1,
  },
  priceSeparator: {
    marginHorizontal: 10,
  },
  stockContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  resetButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 12,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  resetButtonText: {
    color: "#333",
    fontWeight: "600",
  },
  applyButton: {
    backgroundColor: "#FF2A2A",
    borderRadius: 8,
    padding: 12,
    flex: 1,
    marginLeft: 10,
    alignItems: "center",
  },
  applyButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
