import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useAuthStore } from "../src/store/auth.store";
import { useRouter } from "expo-router";

const Setting = () => {
  const { logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/"); // or "/(auth)/login"
    } catch (err) {
      console.error("Logout failed", err);
    }
  };
  return (
    <View>
      <Pressable
        onPress={handleLogout}
        className='bg-red-500 text-2xl font-bold px-4 py-2'
      >
        <Text>Logout</Text>
      </Pressable>
    </View>
  )
}

export default Setting