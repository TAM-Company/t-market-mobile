import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!phone || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }

    if (phone.length < 10) {
      Alert.alert("Erreur", "Numéro de téléphone invalide");
      return;
    }

    setIsLoading(true);

    try {
      // Simulation d'une authentification
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Redirection vers l'application principale
      router.replace("/(tabs)");
    } catch (error) {
      Alert.alert("Erreur", "Échec de la connexion. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatPhoneNumber = (text: string) => {
    // Supprimer tous les caractères non numériques
    const cleaned = text.replace(/\D/g, "");

    // Formater le numéro
    if (cleaned.length <= 2) {
      return cleaned;
    } else if (cleaned.length <= 4) {
      return `${cleaned.slice(0, 2)} ${cleaned.slice(2)}`;
    } else if (cleaned.length <= 6) {
      return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(
        4
      )}`;
    } else if (cleaned.length <= 8) {
      return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(
        4,
        6
      )} ${cleaned.slice(6)}`;
    } else {
      return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(
        4,
        6
      )} ${cleaned.slice(6, 8)} ${cleaned.slice(8, 10)}`;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <View style={styles.logo}>
                <Text style={styles.logoText}>T</Text>
              </View>
              <Text style={styles.appName}>T-Market</Text>
            </View>
            <Text style={styles.subtitle}>Connectez-vous à votre compte</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Numéro de téléphone</Text>
              <View style={styles.phoneInputContainer}>
                <View style={styles.countryCode}>
                  <Text style={styles.countryCodeText}>+225</Text>
                </View>
                <TextInput
                  style={styles.phoneInput}
                  placeholder="07 12 34 56 78"
                  value={formatPhoneNumber(phone)}
                  onChangeText={(text) => setPhone(text.replace(/\s/g, ""))}
                  keyboardType="phone-pad"
                  maxLength={14}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mot de passe</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Entrez votre mot de passe"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={20}
                    color="#666"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>
                Mot de passe oublié ?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.loginButton,
                isLoading && styles.loginButtonDisabled,
              ]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <Text style={styles.loginButtonText}>Connexion...</Text>
              ) : (
                <Text style={styles.loginButtonText}>Se connecter</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Vous n'avez pas de compte ?</Text>
            <TouchableOpacity onPress={() => router.push("/auth/register")}>
              <Text style={styles.registerLink}>Créer un compte</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FF2A2A",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  logoText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  appName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  form: {
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  phoneInputContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    overflow: "hidden",
  },
  countryCode: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 16,
    paddingVertical: 16,
    justifyContent: "center",
    borderRightWidth: 1,
    borderRightColor: "#ddd",
  },
  countryCodeText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: "#333",
  },
  passwordContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: "#333",
  },
  eyeButton: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#FF2A2A",
    fontWeight: "500",
  },
  loginButton: {
    backgroundColor: "#FF2A2A",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  loginButtonDisabled: {
    backgroundColor: "#ccc",
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#666",
    marginRight: 4,
  },
  registerLink: {
    fontSize: 14,
    color: "#FF2A2A",
    fontWeight: "600",
  },
});
