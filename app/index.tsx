import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Simuler l'état d'authentification
const checkAuthStatus = async (): Promise<boolean> => {
  // Simuler une vérification d'authentification
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Pour la démo, on considère que l'utilisateur n'est pas connecté
  // Dans une vraie app, on vérifierait le token stocké
  return false;
};

export default function IndexScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const authStatus = await checkAuthStatus();
        setIsAuthenticated(authStatus);

        // Rediriger selon l'état d'authentification
        if (authStatus) {
          router.replace("/(tabs)");
        } else {
          router.replace("/auth/login");
        }
      } catch (error) {
        console.error("Erreur lors de l'initialisation:", error);
        // En cas d'erreur, rediriger vers la connexion
        router.replace("/auth/login");
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          {/* Logo de l'application */}
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>T</Text>
            </View>
            <Text style={styles.appName}>T-Market</Text>
            <Text style={styles.tagline}>Votre marketplace de confiance</Text>
          </View>

          {/* Indicateur de chargement */}
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF2A2A" />
            <Text style={styles.loadingText}>Chargement...</Text>
          </View>

          {/* Informations de version */}
          <View style={styles.footer}>
            <Text style={styles.versionText}>Version 1.0.0</Text>
            <Text style={styles.copyrightText}>© 2024 T-Market</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // Cette partie ne devrait jamais être affichée car on redirige
  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 60,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 100,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#FF2A2A",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#fff",
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },
  loadingContainer: {
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
    marginTop: 16,
  },
  footer: {
    alignItems: "center",
  },
  versionText: {
    fontSize: 14,
    color: "#999",
    marginBottom: 4,
  },
  copyrightText: {
    fontSize: 12,
    color: "#ccc",
  },
});
