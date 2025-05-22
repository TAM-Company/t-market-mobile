import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

interface BadgeProps {
  count?: number;
  dot?: boolean;
  style?: ViewStyle;
  textColor?: string;
  backgroundColor?: string;
  size?: "small" | "medium" | "large";
}

export const Badge: React.FC<BadgeProps> = ({
  count,
  dot = false,
  style,
  textColor = "#fff",
  backgroundColor = "#F44336",
  size = "medium",
}) => {
  if (count === 0 && !dot) {
    return null;
  }

  const sizeStyles = {
    small: styles.badgeSmall,
    medium: styles.badgeMedium,
    large: styles.badgeLarge,
  };

  const textSizeStyles = {
    small: styles.textSmall,
    medium: styles.textMedium,
    large: styles.textLarge,
  };

  return (
    <View
      style={[
        styles.badge,
        sizeStyles[size],
        { backgroundColor },
        dot && styles.dotBadge,
        style,
      ]}
    >
      {!dot && count !== undefined && (
        <Text style={[styles.text, textSizeStyles[size], { color: textColor }]}>
          {count > 99 ? "99+" : count}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    top: -5,
    right: -5,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#fff",
  },
  badgeSmall: {
    minWidth: 16,
    height: 16,
    paddingHorizontal: 2,
  },
  badgeMedium: {
    minWidth: 20,
    height: 20,
    paddingHorizontal: 4,
  },
  badgeLarge: {
    minWidth: 24,
    height: 24,
    paddingHorizontal: 6,
  },
  dotBadge: {
    minWidth: 10,
    height: 10,
    paddingHorizontal: 0,
  },
  text: {
    fontWeight: "bold",
    textAlign: "center",
  },
  textSmall: {
    fontSize: 10,
  },
  textMedium: {
    fontSize: 12,
  },
  textLarge: {
    fontSize: 14,
  },
});
