import { MessageSquare, Plus } from "lucide-react-native";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import Chat from "../components/Chat";
import SearchBar from "../components/SearchBar";
import Title from "../components/Title";
import { useAuthStore } from "../src/store/auth.store";

const PersonalGrp = () => {
  const personalGrp = useAuthStore((state) => state.groups);

  const personalChats = personalGrp.filter(
    (item: any) => item.isTwoWay === false,
  );
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-[#101927]">
      <View className="px-4 pt-4">
        <Title title="Personal Group" />

        <View className="mt-4">
          <SearchBar onSearch={() => {}} />
        </View>

        {/* Horizontal buttons */}
        <View className="flex-row gap-2 mt-6">
          <Button
            title="Personal Chat"
            icon={<MessageSquare size={16} color="#FF740B" />}
          />
          <Button title="New Group" icon={<Plus size={16} color="#FF740B" />} />
        </View>
        <Chat groups={personalChats} />
      </View>
    </SafeAreaView>
  );
};

export default PersonalGrp;
