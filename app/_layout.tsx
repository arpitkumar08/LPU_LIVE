import { Stack } from "expo-router";
import "../global.css";
import { useAuthStore } from "./src/store/auth.store";
import { useEffect } from "react";

export default function RootLayout() {
  const { hydrateAuth } = useAuthStore();
  
  useEffect(() => {
    hydrateAuth();
  }, []);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#ffffff" },
      }}
    >
      <Stack.Screen
        name="(auth)"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false, animation: "fade" }}
      />
    </Stack>
  );
}
