import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { CartProvider } from "../src/context/CartContext";
import { ThemeProvider } from "../src/context/ThemeContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter-Medium.ttf"),
    "Inter-SemiBold": require("../assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <CartProvider>
            <StatusBar style="auto" />
            <Stack
              screenOptions={{
                headerShown: false,
                animation: "slide_from_right",
                gestureEnabled: true,
                gestureDirection: "horizontal",
              }}
            >
              <Stack.Screen
                name="index"
                options={{
                  headerShown: false,
                  animation: "fade",
                }}
              />
              <Stack.Screen
                name="auth"
                options={{
                  headerShown: false,
                  presentation: "modal",
                  animation: "slide_from_bottom",
                }}
              />
              <Stack.Screen
                name="(tabs)"
                options={{
                  headerShown: false,
                  animation: "fade",
                }}
              />
              <Stack.Screen
                name="shops/index"
                options={{
                  headerShown: false,
                  title: "Boutiques",
                }}
              />
              <Stack.Screen
                name="shops/[id]"
                options={{
                  headerShown: false,
                  presentation: "card",
                }}
              />
              <Stack.Screen
                name="product/[id]"
                options={{
                  headerShown: false,
                  presentation: "card",
                }}
              />
              <Stack.Screen
                name="category/[id]"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="subcategory/[id]"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="payment"
                options={{
                  headerShown: false,
                  presentation: "modal",
                  animation: "slide_from_bottom",
                }}
              />
              <Stack.Screen
                name="panier/index"
                options={{
                  headerShown: false,
                  presentation: "card",
                }}
              />
              <Stack.Screen
                name="aide/index"
                options={{
                  headerShown: false,
                }}
              />
            </Stack>
          </CartProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
