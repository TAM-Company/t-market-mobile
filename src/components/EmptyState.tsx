import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { Button } from "./Button";

interface EmptyStateProps {
  icon?: string;
  title: string;
  message?: string;
  buttonTitle?: string;
  onButtonPress?: () => void;
  iconSize?: number;
  iconColor?: string;
  style?: ViewStyle;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = "alert-circle-outline",
  title,
  message,
  buttonTitle,
  onButtonPress,
  iconSize = 64,
  iconColor = "#ccc",
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Ionicons name={icon as any} size={iconSize} color={iconColor} />
      <Text style={styles.title}>{title}</Text>
      {message && <Text style={styles.message}>{message}</Text>}
      {buttonTitle && onButtonPress && (
        <Button
          title={buttonTitle}
          onPress={onButtonPress}
          variant="primary"
          style={styles.button}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    textAlign: "center",
    color: "#333",
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 8,
    color: "#666",
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    minWidth: 150,
  },
});
