import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "../global.css";
import { useAuthStore } from "./src/store/auth.store";
export default function RootLayout() {
  const { hydrateAuth } = useAuthStore();

  useEffect(() => {
    hydrateAuth();
  }, []);

  return (
    <>
      <StatusBar style="light" backgroundColor="#000000" />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#000000" },
        }}
      >
        <Stack.Screen
          name="(auth)"
          options={{ animation: "fade" }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{ animation: "fade" }}
        />
      </Stack>
    </>
  );
}
