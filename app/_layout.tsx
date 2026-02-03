import { Stack } from "expo-router";
import "../global.css"

export default function RootLayout() {
  return (
    <Stack screenOptions={{headerShown: false, contentStyle: {backgroundColor: "#ffffff"}}}>
      <Stack.Screen name="(auth)" options={{headerShown: false,animation: "fade"}} />
      <Stack.Screen name="(tabs)" options={{headerShown: false,animation: "fade"}} />

    </Stack>
  )
}
