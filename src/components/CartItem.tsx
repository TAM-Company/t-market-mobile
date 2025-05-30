import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CartItem as CartItemType } from "../types";
import { useThemedStyles } from "../context/ThemeContext";
import { Theme } from "../design/theme";

interface CartItemProps {
  item: CartItemType;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onIncrement,
  onDecrement,
  onRemove,
}) => {
  const styles = useThemedStyles(createStyles);
  const { product, quantity } = item;
  const subtotal = product.price * quantity;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: product.images[0] }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={styles.price}>{product.price.toFixed(2)} FCFA</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={onDecrement}
            disabled={quantity <= 1}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={onIncrement}
            disabled={quantity >= product.stock}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
          <Text style={styles.removeButtonText}>×</Text>
        </TouchableOpacity>
        <Text style={styles.subtotal}>{subtotal.toFixed(2)} FCFA</Text>
      </View>
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      backgroundColor: theme.colors.background.card, // Updated
      borderRadius: theme.borderRadius.lg, // Updated
      overflow: "hidden",
      marginBottom: theme.spacing[4], // Updated
      padding: theme.spacing[3], // Updated
      shadowColor: theme.colors.shadow.default, // Updated
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    image: {
      width: 80,
      height: 80,
      borderRadius: theme.borderRadius.md, // Updated
      backgroundColor: theme.colors.background.secondary, // Updated
    },
    infoContainer: {
      flex: 1,
      marginLeft: theme.spacing[3], // Updated
      justifyContent: "space-between",
    },
    name: {
      fontSize: theme.typography.fontSize.base, // Updated
      fontWeight: theme.typography.fontWeight.medium, // Updated
      color: theme.colors.text.primary, // Updated
      marginBottom: theme.spacing[1], // Updated
    },
    price: {
      fontSize: theme.typography.fontSize.sm, // Updated
      color: theme.colors.text.secondary, // Updated
    },
    quantityContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: theme.spacing[2], // Updated
    },
    quantityButton: {
      backgroundColor: theme.colors.background.secondary, // Updated
      borderRadius: theme.borderRadius.sm, // Updated
      width: 28,
      height: 28,
      justifyContent: "center",
      alignItems: "center",
    },
    quantityButtonText: {
      fontSize: theme.typography.fontSize.base, // Updated
      fontWeight: theme.typography.fontWeight.bold, // Updated
      color: theme.colors.text.primary, // Updated
    },
    quantity: {
      fontSize: theme.typography.fontSize.base, // Updated
      color: theme.colors.text.primary, // Updated
      marginHorizontal: theme.spacing[3], // Updated
    },
    rightContainer: {
      justifyContent: "space-between",
      alignItems: "flex-end",
    },
    removeButton: {
      width: 24,
      height: 24,
      borderRadius: theme.borderRadius.full, // Updated
      backgroundColor: theme.colors.background.secondary, // Updated
      justifyContent: "center",
      alignItems: "center",
    },
    removeButtonText: {
      fontSize: theme.typography.fontSize.base, // Updated
      fontWeight: theme.typography.fontWeight.bold, // Updated
      color: theme.colors.text.secondary, // Updated
    },
    subtotal: {
      fontSize: theme.typography.fontSize.base, // Updated
      fontWeight: theme.typography.fontWeight.bold, // Updated
      color: theme.colors.primary[500], // Updated
    },
  });
