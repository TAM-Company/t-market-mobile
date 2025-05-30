import { Stack } from "expo-router";
import React from "react";

export default function ManagementLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Gestion",
          headerShown: true,
          headerStyle: { backgroundColor: "#FF2A2A" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <Stack.Screen
        name="orders"
        options={{
          title: "Commandes",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="inventory"
        options={{
          title: "Inventaire",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="analytics"
        options={{
          title: "Analyses",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
