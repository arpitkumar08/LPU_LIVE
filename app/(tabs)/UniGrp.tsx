import { MessageSquare, Plus } from "lucide-react-native";
import React, { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import Chat from "../components/Chat";
import SearchBar from "../components/SearchBar";
import Title from "../components/Title";
import { useAuthStore } from "../src/store/auth.store";

const UniGrp = () => {
  const groups = useAuthStore((state) => state.groups);

  const [searchQuery, setSearchQuery] = useState("");

  const universityGroups = groups.filter(
    (item: any) =>
      item.isOneToOne === false &&
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  // console.log("groups Data -- ", JSON.stringify(groups, null, 2));

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-[#101927]">
      <View className="px-4 pt-4">
        <Title title="University Group" />

        <View className="mt-4">
          <SearchBar onSearch={handleSearch} />
        </View>

        <View className="flex-row gap-2 mt-6">
          <Button
            title="Personal Chat"
            icon={<MessageSquare size={16} color="#FF740B" />}
          />
          <Button title="New Group" icon={<Plus size={16} color="#FF740B" />} />
        </View>
      </View>

      <Chat groups={universityGroups} />
    </SafeAreaView>
  );
};

export default UniGrp;
