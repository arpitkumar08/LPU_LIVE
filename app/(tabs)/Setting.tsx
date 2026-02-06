import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Bug, ChevronRight, LogOut, Moon, Sun } from "lucide-react-native";
import React, { useState } from "react";
import { Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "../src/store/auth.store";

import Title from "../components/Title";

const Setting = () => {
  const { logout, user } = useAuthStore();
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 pt-4 flex-1">
        <Title title="Settings" />

        {/* Profile Section */}
        <View className="items-center mt-8">
          <Image
            source={{ uri: user?.UserImageUrl }}
            style={{ width: 96, height: 96, borderRadius: 50 }}
            contentFit="cover"
            cachePolicy="memory-disk"
          />
          <View className="items-center justify-center border border-gray-200 px-4 py-4 mt-4 rounded-xl">
            <Text className="text-xl font-bold text-black">
              {user?.Name || "Student Name"}
            </Text>
            <Text className="text-gray-500 mt-1 text-base">
              {user?.Department || "Course Name"}
            </Text>
          </View>
        </View>

        {/* Settings Options */}
        <View className="mt-10 space-y-4">
          {/* Theme Toggle */}
          <View className="flex-row items-center justify-between border border-gray-200  mb-2 bg-gray-50 p-4 rounded-xl">
            <View className="flex-row items-center gap-3">
              <View className="bg-orange-100 p-2 rounded-full">
                {isDarkMode ? (
                  <Moon size={20} color="#F97217" />
                ) : (
                  <Sun size={20} color="#F97217" />
                )}
              </View>
              <Text className="text-base font-semibold text-black">
                Dark Mode
              </Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={setIsDarkMode}
              trackColor={{ false: "#E5E7EB", true: "#F97217" }}
              thumbColor={"#fff"}
            />
          </View>

          {/* Bug Report */}
          <TouchableOpacity className="flex-row items-center justify-between border border-gray-200  mb-2 bg-gray-50 p-4 rounded-xl">
            <View className="flex-row items-center gap-3">
              <View className="bg-orange-100 p-2 rounded-full">
                <Bug size={20} color="#F97217" />
              </View>
              <Text className="text-base font-semibold text-black">
                Report a Bug
              </Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>

          {/* Logout */}
          <TouchableOpacity
            onPress={handleLogout}
            className="flex-row items-center justify-between bg-red-50 p-4 rounded-xl mt-4"
          >
            <View className="flex-row items-center gap-3">
              <View className="bg-red-100 p-2 rounded-full">
                <LogOut size={20} color="#EF4444" />
              </View>
              <Text className="text-base font-semibold text-red-500">
                Logout
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Setting;
