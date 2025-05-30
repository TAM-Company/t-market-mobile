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
import { categories } from "../data/mockData"; // Assuming this is still needed
import { FilterOptions, SortOption } from "../types";
import { useThemedStyles } from "../context/ThemeContext";
import { Theme } from "../design/theme";

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
  const styles = useThemedStyles(createStyles);
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
      // Ensure all filter options are reset if new ones were added
      onSale: false,
      freeShipping: false,
      sortBy: "default",
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
              <Ionicons
                name="close"
                size={24}
                color={styles.closeIcon.color} // Updated
              />
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
                      color={styles.searchIcon.color} // Updated
                      style={styles.searchIcon}
                    />
                    <TextInput
                      style={styles.searchInput}
                      placeholder="Rechercher un produit..."
                      placeholderTextColor={styles.placeholderText.color} // Updated
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
                        filters.category === "" && styles.selectedCategoryButton, // Updated
                      ]}
                      onPress={() => setFilters({ ...filters, category: "" })}
                    >
                      <Text
                        style={[
                          styles.categoryText,
                          filters.category === "" &&
                            styles.selectedCategoryText, // Updated
                        ]}
                      >
                        Toutes
                      </Text>
                    </TouchableOpacity>
                    {categories.map((category) => (
                      <TouchableOpacity
                        key={category.id}
                        style={[
                          styles.categoryButton,
                          filters.category === category.id &&
                            styles.selectedCategoryButton, // Updated
                        ]}
                        onPress={() =>
                          setFilters({ ...filters, category: category.id })
                        }
                      >
                        <Text
                          style={[
                            styles.categoryText,
                            filters.category === category.id &&
                              styles.selectedCategoryText, // Updated
                          ]}
                        >
                          {category.name}
                        </Text>
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
                      placeholderTextColor={styles.placeholderText.color} // Updated
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
                      placeholderTextColor={styles.placeholderText.color} // Updated
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
                        trackColor={{
                          false: styles.switchTrack.false, // Updated
                          true: styles.switchTrack.true, // Updated
                        }}
                        thumbColor={
                          filters.inStock
                            ? styles.switchThumb.true // Updated
                            : styles.switchThumb.false // Updated
                        }
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
                        trackColor={{
                          false: styles.switchTrack.false, // Updated
                          true: styles.switchTrack.true, // Updated
                        }}
                        thumbColor={
                          filters.onSale
                            ? styles.switchThumb.true // Updated
                            : styles.switchThumb.false // Updated
                        }
                      />
                    </View>

                    <View style={styles.stockContainer}>
                      <Text style={styles.optionText}>Livraison gratuite</Text>
                      <Switch
                        value={filters.freeShipping || false}
                        onValueChange={(value) =>
                          setFilters({ ...filters, freeShipping: value })
                        }
                        trackColor={{
                          false: styles.switchTrack.false, // Updated
                          true: styles.switchTrack.true, // Updated
                        }}
                        thumbColor={
                          filters.freeShipping
                            ? styles.switchThumb.true // Updated
                            : styles.switchThumb.false // Updated
                        }
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
                      <Ionicons
                        name="checkmark"
                        size={20}
                        color={styles.checkmarkIcon.color} // Updated
                      />
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

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalView: {
      backgroundColor: theme.colors.background.primary, // Updated
      borderTopLeftRadius: theme.borderRadius.xl, // Updated
      borderTopRightRadius: theme.borderRadius.xl, // Updated
      padding: theme.spacing[5], // Updated
      height: "80%",
    },
    scrollView: {
      flex: 1,
    },
    modalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: theme.spacing[4], // Updated
    },
    modalTitle: {
      fontSize: theme.typography.fontSize.xl, // Updated
      fontWeight: theme.typography.fontWeight.bold, // Updated
      color: theme.colors.text.primary, // Updated
    },
    closeButton: {
      padding: theme.spacing[1], // Updated
    },
    closeIcon: { // Added
      color: theme.colors.text.primary,
    },
    tabContainer: {
      flexDirection: "row",
      marginBottom: theme.spacing[5], // Updated
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border.light, // Updated
    },
    tab: {
      flex: 1,
      paddingVertical: theme.spacing[3], // Updated
      alignItems: "center",
    },
    activeTab: {
      borderBottomWidth: 2,
      borderBottomColor: theme.colors.primary[500], // Updated
    },
    tabText: {
      fontSize: theme.typography.fontSize.base, // Updated
      color: theme.colors.text.secondary, // Updated
    },
    activeTabText: {
      color: theme.colors.primary[500], // Updated
      fontWeight: theme.typography.fontWeight.semibold, // Updated
    },
    filterSection: {
      marginBottom: theme.spacing[5], // Updated
    },
    sectionTitle: {
      fontSize: theme.typography.fontSize.base, // Updated
      fontWeight: theme.typography.fontWeight.semibold, // Updated
      color: theme.colors.text.primary, // Updated
      marginBottom: theme.spacing[3], // Updated
    },
    input: {
      borderWidth: 1,
      borderColor: theme.colors.border.medium, // Updated
      borderRadius: theme.borderRadius.md, // Updated
      padding: theme.spacing[3], // Updated
      fontSize: theme.typography.fontSize.base, // Updated
      color: theme.colors.text.primary, // Added
    },
    searchInputContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme.colors.border.medium, // Updated
      borderRadius: theme.borderRadius.md, // Updated
      paddingHorizontal: theme.spacing[3], // Updated
    },
    searchIcon: {
      marginRight: theme.spacing[2], // Updated
      color: theme.colors.text.secondary, // Added
    },
    searchInput: {
      flex: 1,
      paddingVertical: theme.spacing[3], // Updated for consistency with input
      paddingHorizontal: theme.spacing[1], // Reduced padding as icon has margin
      fontSize: theme.typography.fontSize.base, // Updated
      color: theme.colors.text.primary, // Added
    },
    placeholderText: { // Added
      color: theme.colors.text.placeholder,
    },
    categoriesContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginHorizontal: -theme.spacing[1], // Updated
    },
    categoryButton: {
      borderWidth: 1,
      borderColor: theme.colors.border.medium, // Updated
      borderRadius: theme.borderRadius.full, // Updated
      paddingVertical: theme.spacing[2], // Updated
      paddingHorizontal: theme.spacing[3], // Updated
      margin: theme.spacing[1], // Updated
    },
    selectedCategoryButton: { // Renamed from selectedCategory
      backgroundColor: theme.colors.primary[500], // Updated
      borderColor: theme.colors.primary[500], // Updated
    },
    categoryText: {
      color: theme.colors.text.primary, // Updated
      fontSize: theme.typography.fontSize.sm, // Added
    },
    selectedCategoryText: { // Added
      color: theme.colors.text.inverse,
    },
    priceContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    priceInput: {
      flex: 1,
    },
    priceSeparator: {
      marginHorizontal: theme.spacing[2], // Updated
      color: theme.colors.text.secondary, // Added
    },
    optionsContainer: {
      backgroundColor: theme.colors.background.secondary, // Updated
      borderRadius: theme.borderRadius.md, // Updated
      padding: theme.spacing[3], // Updated
    },
    stockContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: theme.spacing[2], // Updated
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border.light, // Updated
    },
    optionText: {
      fontSize: theme.typography.fontSize.base, // Updated
      color: theme.colors.text.primary, // Updated
    },
    switchTrack: { // Added
      false: theme.colors.background.disabled,
      true: theme.colors.primary[500],
    },
    switchThumb: { // Added
      false: theme.colors.background.card,
      true: theme.colors.background.card,
    },
    sortSection: {
      marginBottom: theme.spacing[5], // Updated
    },
    sortOption: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: theme.spacing[3], // Updated
      paddingHorizontal: theme.spacing[4], // Updated
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border.light, // Updated
    },
    selectedSortOption: {
      backgroundColor: theme.colors.primary[50], // Updated
    },
    sortOptionText: {
      fontSize: theme.typography.fontSize.base, // Updated
      color: theme.colors.text.primary, // Updated
    },
    selectedSortOptionText: {
      color: theme.colors.primary[500], // Updated
      fontWeight: theme.typography.fontWeight.semibold, // Updated
    },
    checkmarkIcon: { // Added
        color: theme.colors.primary[500],
    },
    buttonsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: theme.spacing[3], // Updated
      paddingTop: theme.spacing[3], // Added for separation
      borderTopWidth: 1, // Added
      borderTopColor: theme.colors.border.light, // Added
    },
    resetButton: {
      backgroundColor: theme.colors.background.secondary, // Updated
      borderRadius: theme.borderRadius.md, // Updated
      paddingVertical: theme.spacing[3], // Updated
      paddingHorizontal: theme.spacing[4], // Added
      flex: 1,
      marginRight: theme.spacing[2], // Updated
      alignItems: "center",
    },
    resetButtonText: {
      color: theme.colors.text.primary, // Updated
      fontWeight: theme.typography.fontWeight.semibold, // Updated
      fontSize: theme.typography.fontSize.base, // Added
    },
    applyButton: {
      backgroundColor: theme.colors.primary[500], // Updated
      borderRadius: theme.borderRadius.md, // Updated
      paddingVertical: theme.spacing[3], // Updated
      paddingHorizontal: theme.spacing[4], // Added
      flex: 1,
      marginLeft: theme.spacing[2], // Updated
      alignItems: "center",
    },
    applyButtonText: {
      color: theme.colors.text.inverse, // Updated
      fontWeight: theme.typography.fontWeight.semibold, // Updated
      fontSize: theme.typography.fontSize.base, // Added
    },
  });
