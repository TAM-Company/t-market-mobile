import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { CenteredLayout } from "../src/components/layout/Layout";
import { Button } from "../src/components/ui/Button";
import { Card, CardBody, CardHeader } from "../src/components/ui/Card";
import { Input } from "../src/components/ui/Input";
import { useTheme } from "../src/context/ThemeContext";

export default function AuthScreen() {
  const { theme } = useTheme();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas");
      return;
    }

    setLoading(true);

    // Simulation d'authentification
    setTimeout(() => {
      setLoading(false);
      router.replace("/(tabs)");
    }, 1500);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background.secondary,
    },
    content: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: theme.spacing.lg,
    },
    card: {
      marginHorizontal: theme.spacing.md,
    },
    title: {
      fontSize: theme.typography.fontSize["2xl"],
      fontWeight: theme.typography.fontWeight.bold,
      color: theme.colors.text.primary,
      textAlign: "center",
      marginBottom: theme.spacing.sm,
    },
    subtitle: {
      fontSize: theme.typography.fontSize.base,
      color: theme.colors.text.secondary,
      textAlign: "center",
      marginBottom: theme.spacing.xl,
    },
    inputContainer: {
      marginBottom: theme.spacing.md,
    },
    switchContainer: {
      marginTop: theme.spacing.lg,
      alignItems: "center",
    },
    switchText: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
      marginBottom: theme.spacing.sm,
    },
    switchButton: {
      paddingVertical: theme.spacing.sm,
    },
    switchButtonText: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.primary[500],
      fontWeight: theme.typography.fontWeight.semibold,
    },
  });

  return (
    <CenteredLayout style={styles.container}>
      <View style={styles.content}>
        <Card variant="elevated" style={styles.card}>
          <CardHeader>
            <Text style={styles.title}>
              {isLogin ? "Connexion" : "Inscription"}
            </Text>
            <Text style={styles.subtitle}>
              {isLogin
                ? "Connectez-vous à votre compte"
                : "Créez votre compte T-Market"}
            </Text>
          </CardHeader>

          <CardBody>
            {!isLogin && (
              <View style={styles.inputContainer}>
                <Input
                  label="Nom complet"
                  value={name}
                  onChangeText={setName}
                  placeholder="Entrez votre nom complet"
                  leftIcon="person-outline"
                />
              </View>
            )}

            <View style={styles.inputContainer}>
              <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="Entrez votre email"
                keyboardType="email-address"
                autoCapitalize="none"
                leftIcon="mail-outline"
              />
            </View>

            <View style={styles.inputContainer}>
              <Input
                label="Mot de passe"
                value={password}
                onChangeText={setPassword}
                placeholder="Entrez votre mot de passe"
                secureTextEntry
                leftIcon="lock-closed-outline"
              />
            </View>

            {!isLogin && (
              <View style={styles.inputContainer}>
                <Input
                  label="Confirmer le mot de passe"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Confirmez votre mot de passe"
                  secureTextEntry
                  leftIcon="lock-closed-outline"
                />
              </View>
            )}

            <Button onPress={handleAuth} loading={loading} size="lg" fullWidth>
              {isLogin ? "Se connecter" : "S'inscrire"}
            </Button>

            <View style={styles.switchContainer}>
              <Text style={styles.switchText}>
                {isLogin
                  ? "Vous n'avez pas de compte ?"
                  : "Vous avez déjà un compte ?"}
              </Text>
              <Button
                variant="ghost"
                onPress={() => setIsLogin(!isLogin)}
                style={styles.switchButton}
              >
                <Text style={styles.switchButtonText}>
                  {isLogin ? "S'inscrire" : "Se connecter"}
                </Text>
              </Button>
            </View>
          </CardBody>
        </Card>
      </View>
    </CenteredLayout>
  );
}
