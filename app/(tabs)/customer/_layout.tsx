import { Stack } from "expo-router";
import React from "react";

export default function CustomerLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Espace Client",
          headerShown: true,
          headerStyle: { backgroundColor: "#FF2A2A" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <Stack.Screen
        name="cart"
        options={{
          title: "Panier",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          title: "Profil",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
