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
import { UserRole } from "../../src/types";

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    role: "reseller" as UserRole,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (
      !formData.name ||
      !formData.phone ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs obligatoires");
      return;
    }

    if (formData.phone.length < 10) {
      Alert.alert("Erreur", "Numéro de téléphone invalide");
      return;
    }

    if (formData.password.length < 6) {
      Alert.alert(
        "Erreur",
        "Le mot de passe doit contenir au moins 6 caractères"
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas");
      return;
    }

    if (formData.role === "supplier" && !formData.businessName) {
      Alert.alert(
        "Erreur",
        "Le nom de l'entreprise est obligatoire pour les fournisseurs"
      );
      return;
    }

    setIsLoading(true);

    try {
      // Simulation d'une inscription
      await new Promise((resolve) => setTimeout(resolve, 2000));

      Alert.alert("Succès", "Votre compte a été créé avec succès!", [
        { text: "OK", onPress: () => router.replace("/auth/login") },
      ]);
    } catch (error) {
      Alert.alert(
        "Erreur",
        "Échec de la création du compte. Veuillez réessayer."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const formatPhoneNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, "");

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

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Créer un compte</Text>
              <Text style={styles.subtitle}>
                Rejoignez T-Market aujourd'hui
              </Text>
            </View>
          </View>

          <View style={styles.form}>
            {/* Sélection du rôle */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Type de compte</Text>
              <View style={styles.roleContainer}>
                <TouchableOpacity
                  style={[
                    styles.roleOption,
                    formData.role === "reseller" && styles.roleOptionActive,
                  ]}
                  onPress={() => updateFormData("role", "reseller")}
                >
                  <Ionicons
                    name="storefront"
                    size={24}
                    color={formData.role === "reseller" ? "#FF2A2A" : "#666"}
                  />
                  <Text
                    style={[
                      styles.roleText,
                      formData.role === "reseller" && styles.roleTextActive,
                    ]}
                  >
                    Revendeur
                  </Text>
                  <Text style={styles.roleDescription}>
                    Acheter et revendre des produits
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.roleOption,
                    formData.role === "supplier" && styles.roleOptionActive,
                  ]}
                  onPress={() => updateFormData("role", "supplier")}
                >
                  <Ionicons
                    name="business"
                    size={24}
                    color={formData.role === "supplier" ? "#FF2A2A" : "#666"}
                  />
                  <Text
                    style={[
                      styles.roleText,
                      formData.role === "supplier" && styles.roleTextActive,
                    ]}
                  >
                    Fournisseur
                  </Text>
                  <Text style={styles.roleDescription}>
                    Vendre vos produits
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Nom complet */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nom complet *</Text>
              <TextInput
                style={styles.input}
                placeholder="Entrez votre nom complet"
                value={formData.name}
                onChangeText={(text) => updateFormData("name", text)}
              />
            </View>

            {/* Nom de l'entreprise (pour fournisseurs) */}
            {formData.role === "supplier" && (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nom de l'entreprise *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Entrez le nom de votre entreprise"
                  value={formData.businessName}
                  onChangeText={(text) => updateFormData("businessName", text)}
                />
              </View>
            )}

            {/* Numéro de téléphone */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Numéro de téléphone *</Text>
              <View style={styles.phoneInputContainer}>
                <View style={styles.countryCode}>
                  <Text style={styles.countryCodeText}>+225</Text>
                </View>
                <TextInput
                  style={styles.phoneInput}
                  placeholder="07 12 34 56 78"
                  value={formatPhoneNumber(formData.phone)}
                  onChangeText={(text) =>
                    updateFormData("phone", text.replace(/\s/g, ""))
                  }
                  keyboardType="phone-pad"
                  maxLength={14}
                />
              </View>
            </View>

            {/* Mot de passe */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mot de passe *</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Minimum 6 caractères"
                  value={formData.password}
                  onChangeText={(text) => updateFormData("password", text)}
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

            {/* Confirmer mot de passe */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Confirmer le mot de passe *</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Confirmez votre mot de passe"
                  value={formData.confirmPassword}
                  onChangeText={(text) =>
                    updateFormData("confirmPassword", text)
                  }
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Ionicons
                    name={showConfirmPassword ? "eye-off" : "eye"}
                    size={20}
                    color="#666"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.registerButton,
                isLoading && styles.registerButtonDisabled,
              ]}
              onPress={handleRegister}
              disabled={isLoading}
            >
              {isLoading ? (
                <Text style={styles.registerButtonText}>
                  Création du compte...
                </Text>
              ) : (
                <Text style={styles.registerButtonText}>Créer mon compte</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Vous avez déjà un compte ?</Text>
            <TouchableOpacity onPress={() => router.push("/auth/login")}>
              <Text style={styles.loginLink}>Se connecter</Text>
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
    padding: 24,
  },
  header: {
    marginBottom: 32,
  },
  backButton: {
    marginBottom: 16,
  },
  titleContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
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
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: "#333",
  },
  roleContainer: {
    flexDirection: "row",
    gap: 12,
  },
  roleOption: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ddd",
    padding: 16,
    alignItems: "center",
  },
  roleOptionActive: {
    borderColor: "#FF2A2A",
    backgroundColor: "#fff5f5",
  },
  roleText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginTop: 8,
    marginBottom: 4,
  },
  roleTextActive: {
    color: "#FF2A2A",
  },
  roleDescription: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
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
  registerButton: {
    backgroundColor: "#FF2A2A",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
  },
  registerButtonDisabled: {
    backgroundColor: "#ccc",
  },
  registerButtonText: {
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
  loginLink: {
    fontSize: 14,
    color: "#FF2A2A",
    fontWeight: "600",
  },
});
