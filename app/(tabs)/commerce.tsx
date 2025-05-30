import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LayoutWithHeader } from "../../src/components/layout/Layout";
import { useTheme } from "../../src/context/ThemeContext";

export default function CommerceScreen() {
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
    <LayoutWithHeader title="Commerce" showBackButton={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Commerce</Text>
        <Text style={styles.subtitle}>Gérez vos activités commerciales</Text>
      </View>
    </LayoutWithHeader>
  );
}
