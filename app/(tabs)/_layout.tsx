import { Redirect } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MaterialTopTabs } from "../components/MaterialTopTabs";
import { useAuthStore } from "../src/store/auth.store";

import TabBar from "../components/TabBar";

export default function TabsLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Redirect href={{ pathname: "/(auth)" }} />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <MaterialTopTabs
        tabBarPosition="bottom"
        tabBar={(props) => <TabBar {...props} />}
      >
        <MaterialTopTabs.Screen name="UniGrp" />
        <MaterialTopTabs.Screen name="PersonaChat" />
        <MaterialTopTabs.Screen name="PersonalGrp" />
        <MaterialTopTabs.Screen name="Setting" />
      </MaterialTopTabs>
    </GestureHandlerRootView>
  );
}
