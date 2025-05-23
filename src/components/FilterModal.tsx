import { Ionicons } from "@expo/vector-icons";
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
import { FilterOptions, SortOption } from "../types";

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  currentFilters: FilterOptions;
  initialFilters?: FilterOptions;
  onApplyFilters: (filters: FilterOptions) => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  currentFilters,
  initialFilters,
  onApplyFilters,
}) => {
  const [filters, setFilters] = useState<FilterOptions>(currentFilters);
  const [activeTab, setActiveTab] = useState<"filters" | "sort">("filters");

  const sortOptions: { id: SortOption; label: string }[] = [
    { id: "default", label: "Par défaut" },
    { id: "price-asc", label: "Prix croissant" },
    { id: "price-desc", label: "Prix décroissant" },
    { id: "name-asc", label: "Nom (A-Z)" },
    { id: "name-desc", label: "Nom (Z-A)" },
    { id: "newest", label: "Plus récents" },
  ];

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
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Recherche avancée</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === "filters" && styles.activeTab]}
              onPress={() => setActiveTab("filters")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "filters" && styles.activeTabText,
                ]}
              >
                Filtres
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === "sort" && styles.activeTab]}
              onPress={() => setActiveTab("sort")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "sort" && styles.activeTabText,
                ]}
              >
                Trier
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollView}>
            {activeTab === "filters" ? (
              <>
                <View style={styles.filterSection}>
                  <Text style={styles.sectionTitle}>Recherche</Text>
                  <View style={styles.searchInputContainer}>
                    <Ionicons
                      name="search-outline"
                      size={20}
                      color="#666"
                      style={styles.searchIcon}
                    />
                    <TextInput
                      style={styles.searchInput}
                      placeholder="Rechercher un produit..."
                      value={filters.searchQuery}
                      onChangeText={(text) =>
                        setFilters({ ...filters, searchQuery: text })
                      }
                    />
                  </View>
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
                        filters.minPrice !== null
                          ? filters.minPrice.toString()
                          : ""
                      }
                      onChangeText={(text) => {
                        const value =
                          text.trim() === "" ? null : parseFloat(text);
                        setFilters({ ...filters, minPrice: value });
                      }}
                    />
                    <Text style={styles.priceSeparator}>à</Text>
                    <TextInput
                      style={[styles.input, styles.priceInput]}
                      placeholder="Max"
                      keyboardType="numeric"
                      value={
                        filters.maxPrice !== null
                          ? filters.maxPrice.toString()
                          : ""
                      }
                      onChangeText={(text) => {
                        const value =
                          text.trim() === "" ? null : parseFloat(text);
                        setFilters({ ...filters, maxPrice: value });
                      }}
                    />
                  </View>
                </View>

                <View style={styles.filterSection}>
                  <Text style={styles.sectionTitle}>
                    Options supplémentaires
                  </Text>
                  <View style={styles.optionsContainer}>
                    <View style={styles.stockContainer}>
                      <Text style={styles.optionText}>
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

                    <View style={styles.stockContainer}>
                      <Text style={styles.optionText}>
                        Produits en promotion
                      </Text>
                      <Switch
                        value={filters.onSale || false}
                        onValueChange={(value) =>
                          setFilters({ ...filters, onSale: value })
                        }
                        trackColor={{ false: "#767577", true: "#FF2A2A" }}
                        thumbColor={filters.onSale ? "#fff" : "#f4f3f4"}
                      />
                    </View>

                    <View style={styles.stockContainer}>
                      <Text style={styles.optionText}>Livraison gratuite</Text>
                      <Switch
                        value={filters.freeShipping || false}
                        onValueChange={(value) =>
                          setFilters({ ...filters, freeShipping: value })
                        }
                        trackColor={{ false: "#767577", true: "#FF2A2A" }}
                        thumbColor={filters.freeShipping ? "#fff" : "#f4f3f4"}
                      />
                    </View>
                  </View>
                </View>
              </>
            ) : (
              <View style={styles.sortSection}>
                <Text style={styles.sectionTitle}>Trier par</Text>
                {sortOptions.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.sortOption,
                      filters.sortBy === option.id && styles.selectedSortOption,
                    ]}
                    onPress={() =>
                      setFilters({ ...filters, sortBy: option.id })
                    }
                  >
                    <Text
                      style={[
                        styles.sortOptionText,
                        filters.sortBy === option.id &&
                          styles.selectedSortOptionText,
                      ]}
                    >
                      {option.label}
                    </Text>
                    {filters.sortBy === option.id && (
                      <Ionicons name="checkmark" size={20} color="#FF2A2A" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
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
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 4,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 20,
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
    fontSize: 16,
    color: "#666",
  },
  activeTabText: {
    color: "#FF2A2A",
    fontWeight: "600",
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
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
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
  optionsContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 12,
  },
  stockContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  sortSection: {
    marginBottom: 20,
  },
  sortOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  selectedSortOption: {
    backgroundColor: "#FFF5F5",
  },
  sortOptionText: {
    fontSize: 16,
    color: "#333",
  },
  selectedSortOptionText: {
    color: "#FF2A2A",
    fontWeight: "600",
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
