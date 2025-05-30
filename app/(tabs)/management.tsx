import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LayoutWithHeader } from "../../src/components/layout/Layout";
import { useTheme } from "../../src/context/ThemeContext";

export default function ManagementScreen() {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.background.primary,
    },
    title: {
      fontSize: theme.typography.fontSize.xl,
      fontWeight: theme.typography.fontWeight.bold,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.md,
    },
    subtitle: {
      fontSize: theme.typography.fontSize.base,
      color: theme.colors.text.secondary,
      textAlign: "center",
    },
  });

  return (
    <LayoutWithHeader title="Gestion" showBackButton={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Gestion</Text>
        <Text style={styles.subtitle}>
          Outils de gestion et d'administration
        </Text>
      </View>
    </LayoutWithHeader>
  );
}
