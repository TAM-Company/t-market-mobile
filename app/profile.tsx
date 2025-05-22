import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Card, Header, Input } from "../src/components";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    phone: "06 12 34 56 78",
    address: "123 Rue de Paris, 75001 Paris",
  });

  const [formData, setFormData] = useState<UserProfile>(profile);

  const handleEdit = () => {
    if (isEditing) {
      // Sauvegarder les modifications
      setProfile(formData);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View style={styles.container}>
        <Header title="Mon Profil" showBackButton />

        <ScrollView style={styles.scrollContainer}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Ionicons name="person-circle" size={100} color="#FF2A2A" />
            </View>
            <Text style={styles.profileName}>{profile.name}</Text>
          </View>

          <Card style={styles.infoCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Informations personnelles</Text>
              <Button
                title={isEditing ? "Enregistrer" : "Modifier"}
                onPress={handleEdit}
                variant="outline"
                style={styles.editButton}
              />
            </View>

            {isEditing ? (
              <View style={styles.formContainer}>
                <Input
                  label="Nom"
                  value={formData.name}
                  onChangeText={(text) =>
                    setFormData({ ...formData, name: text })
                  }
                />
                <Input
                  label="Email"
                  value={formData.email}
                  onChangeText={(text) =>
                    setFormData({ ...formData, email: text })
                  }
                  keyboardType="email-address"
                />
                <Input
                  label="Téléphone"
                  value={formData.phone}
                  onChangeText={(text) =>
                    setFormData({ ...formData, phone: text })
                  }
                  keyboardType="phone-pad"
                />
                <Input
                  label="Adresse"
                  value={formData.address}
                  onChangeText={(text) =>
                    setFormData({ ...formData, address: text })
                  }
                  multiline
                />
                <Button
                  title="Annuler"
                  onPress={handleCancel}
                  variant="secondary"
                  style={styles.cancelButton}
                />
              </View>
            ) : (
              <View style={styles.infoContainer}>
                <View style={styles.infoRow}>
                  <Ionicons name="mail-outline" size={20} color="#666" />
                  <Text style={styles.infoText}>{profile.email}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Ionicons name="call-outline" size={20} color="#666" />
                  <Text style={styles.infoText}>{profile.phone}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Ionicons name="location-outline" size={20} color="#666" />
                  <Text style={styles.infoText}>{profile.address}</Text>
                </View>
              </View>
            )}
          </Card>

          <Card style={styles.infoCard}>
            <Text style={styles.sectionTitle}>Paramètres</Text>
            <View style={styles.settingsContainer}>
              <Button
                title="Changer le mot de passe"
                onPress={() => alert("Fonctionnalité à venir")}
                variant="outline"
                fullWidth
                style={styles.settingButton}
              />
              <Button
                title="Notifications"
                onPress={() => alert("Fonctionnalité à venir")}
                variant="outline"
                fullWidth
                style={styles.settingButton}
              />
              <Button
                title="Confidentialité"
                onPress={() => alert("Fonctionnalité à venir")}
                variant="outline"
                fullWidth
                style={styles.settingButton}
              />
            </View>
          </Card>

          <Button
            title="Déconnexion"
            onPress={() => alert("Déconnexion réussie")}
            variant="secondary"
            style={styles.logoutButton}
            textStyle={styles.logoutButtonText}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatarContainer: {
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  infoCard: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  infoContainer: {
    marginTop: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
  },
  formContainer: {
    marginTop: 10,
  },
  cancelButton: {
    marginTop: 10,
  },
  settingsContainer: {
    marginTop: 10,
  },
  settingButton: {
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: "#f0f0f0",
    marginTop: 10,
    marginBottom: 30,
  },
  logoutButtonText: {
    color: "#F44336",
  },
});
