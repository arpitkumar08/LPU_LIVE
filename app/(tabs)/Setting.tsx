import { BottomSheetModal, BottomSheetTextInput, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { Bug, ChevronRight, LogOut, Moon, Sun } from "lucide-react-native";
import React, { useRef, useState } from "react";
import { Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AppBottomSheet from "../components/AppBottomSheet";
import Title from "../components/Title";
import { useAuthStore } from "../src/store/auth.store";
import { InfoBox } from "../components/InfoCard";

const Setting = () => {
  const { logout, user } = useAuthStore();
  const router = useRouter();

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [bugImage, setBugImage] = useState<string | null>(null);
  const [bugDescription, setBugDescription] = useState("");

  const bugSheetRef = useRef<BottomSheetModal>(null);

  const openBugSheet = () => {
    bugSheetRef.current?.present();
  };

  const pickBugImage = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setBugImage(result.assets[0].uri);
    }
  };

  const handleReportBug = () => {
    bugSheetRef.current?.dismiss();
    setBugDescription("");
    setBugImage(null);
  };

  const handleLogout = async () => {
    await logout();
    router.replace("/");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-4 pt-4">
        <Title title="Settings" />

        {/* PROFILE */}
        <View className="items-center mt-8">
          <Image
            source={{ uri: user?.UserImageUrl }}
            style={{ width: 96, height: 96, borderRadius: 50 }}
            contentFit="cover"
          />

          <View className="items-center mt-4 border border-gray-200 px-4 py-4 rounded-xl">
            <Text className="text-xl font-bold text-black">
              {user?.Name || "Student Name"}
            </Text>
            <Text className="text-gray-500 mt-1 text-base">
              {user?.Department || "Course Name"}
            </Text>
          </View>
        </View>

        {/* OPTIONS */}
        <View className="mt-10 space-y-4">
          <View className="flex-row items-center justify-between bg-gray-50 border border-gray-200 p-4 rounded-xl">
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
              thumbColor="#fff"
            />
          </View>

          <TouchableOpacity
            onPress={openBugSheet}
            className="flex-row items-center justify-between bg-gray-50 border border-gray-200 mt-2 p-4 rounded-xl"
          >
            <View className="flex-row items-center gap-3">
              <View className="bg-orange-100  p-2 rounded-full">
                <Bug size={20} color="#F97217" />
              </View>
              <Text className="text-base font-semibold text-black">
                Report a Bug
              </Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLogout}
            className="flex-row items-center bg-red-50 p-4 rounded-xl mt-4"
          >
            <View className="bg-red-100 p-2 rounded-full mr-3">
              <LogOut size={20} color="#EF4444" />
            </View>
            <Text className="text-base font-semibold text-red-500">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* BOTTOM SHEET */}
      <AppBottomSheet
        ref={bugSheetRef}
        snapPoints={["65%","75%"]}
      >
        <BottomSheetScrollView 
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text className="text-2xl text-center font-bold mb-6 text-black">
            Report Bug
          </Text>

          <View className="flex-row flex-wrap justify-between gap-y-4">
            <InfoBox label="Name" value={user?.Name.split(":")[0].trim()} />
            <InfoBox
              label="ID"
              value={
                user?.Name?.includes(":")
                  ? user?.Name.split(":")[1].trim()
                  : "N/A"
              }
            />
            <InfoBox label="Category" value={user?.Category} />
            <InfoBox label="Department" value={user?.Department} />
          </View>

          <View className="mt-4">
            <Text className="text-gray-500 text-sm mb-2 ml-1">
              Bug Description
            </Text>
            <BottomSheetTextInput
              value={bugDescription}
              onChangeText={setBugDescription}
              onFocus={() => {
                bugSheetRef.current?.snapToIndex(1);
              }}
              placeholder="Describe the issue..."
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={6}
              style={{ minHeight: 120, textAlignVertical: "top" }}
              className="border border-gray-200 rounded-xl p-4 bg-gray-50 text-black"
            />
          </View>

          <View className="mt-5">
            <Text className="text-gray-500 text-sm mb-2 ml-1">
              Screenshot (optional)
            </Text>

            {bugImage ? (
              <View className="relative">
                <Image
                  source={{ uri: bugImage }}
                  style={{ height: 160, borderRadius: 12 }}
                  contentFit="cover"
                />
                <TouchableOpacity
                  onPress={() => setBugImage(null)}
                  className="absolute top-2 right-2 bg-black/60 px-3 py-1 rounded-full"
                >
                  <Text className="text-white text-xs">Remove</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                onPress={pickBugImage}
                className="border border-dashed border-gray-300 rounded-xl p-4 bg-gray-50 items-center"
              >
                <Text className="text-gray-600 font-medium">
                  + Add Screenshot
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            onPress={handleReportBug}
            className="bg-orange-500 py-3 rounded-xl mt-6 mb-4"
          >
            <Text className="text-white text-center font-semibold text-lg">
              Send Bug Report
            </Text>
          </TouchableOpacity>
        </BottomSheetScrollView>
      </AppBottomSheet>
    </SafeAreaView>
  );
};

export default Setting;