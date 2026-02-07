import { Redirect, Tabs } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useAuthStore } from "../src/store/auth.store";

import TabBar from "../components/TabBar";

export default function TabsLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Redirect href={{ pathname: "/(auth)" }} />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <TabBar {...props} />}
      >
        <Tabs.Screen name="UniGrp" />
        <Tabs.Screen name="PersonaChat" />
        <Tabs.Screen name="PersonalGrp" />
        <Tabs.Screen name="Setting" />
      </Tabs>
    </GestureHandlerRootView>
  );
}
