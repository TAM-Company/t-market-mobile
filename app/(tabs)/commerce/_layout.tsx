import { Stack } from "expo-router";
import React from "react";

export default function CommerceLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Commerce",
          headerShown: true,
          headerStyle: { backgroundColor: "#FF2A2A" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <Stack.Screen
        name="products"
        options={{
          title: "Produits",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="categories"
        options={{
          title: "Catégories",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
