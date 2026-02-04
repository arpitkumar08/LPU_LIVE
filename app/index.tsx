import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { getToken } from "./src/utils/storage";
import { useAuthStore } from "./src/store/auth.store";

export default function Index() {
  const { isAuthenticated } = useAuthStore();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const restoreAuth = async () => {
      const token = await getToken();

      if (token) {
        useAuthStore.setState({
          token,
          isAuthenticated: true,
        });
      }

      setCheckingAuth(false);
    };

    restoreAuth();
  }, []);

  if (checkingAuth) return null;

  return (
    <Redirect href={isAuthenticated ? "/(tabs)/UniGrp" : "/(auth)"} />
  );
}
