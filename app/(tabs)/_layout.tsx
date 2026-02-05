import { Redirect, Tabs } from "expo-router";
import TabBar from "../components/TabBar";
import { useAuthStore } from "../src/store/auth.store";

export default function TabsLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Redirect href={{ pathname: "/(auth)" }} />;
  }

  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen name="UniGrp" />
      <Tabs.Screen name="PersonaChat" />
      <Tabs.Screen name="PersonalGrp" />
      <Tabs.Screen name="Setting" />
    </Tabs>
  );

}
