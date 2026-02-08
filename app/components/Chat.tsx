import { Image } from "expo-image";
import { ChevronRightIcon, Search } from "lucide-react-native";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { GroupItem } from "../src/types/chat";

interface ChatProps {
  groups: GroupItem[];
}

const Chat: React.FC<ChatProps> = ({ groups }) => {
  // console.log("Chat: groups prop:", JSON.stringify(groups, null, 2));

  const renderItem = ({ item }: { item: GroupItem }) => (
    <TouchableOpacity className="px-4 py-3 border-t border-gray-200 flex-row gap-4">
      <Image
        source={require("../../assets/images/lpulogo.png")}
        style={{ width: 50, height: 50 }}
        contentFit="contain"
      />

      <View className="flex-1">
        <Text className="text-base font-semibold text-black">
          {item.isOneToOne ? `${item.personalChatName}` : item.name}
        </Text>

        <Text className="text-sm text-gray-500 mt-1">
          {item.groupLastMessage || "No recent messages"}
        </Text>

        {item.lastMessageTime ? (
          <Text className="text-xs text-gray-400 mt-1">
            {item.lastMessageTime}
          </Text>
        ) : null}
      </View>

      <View className="items-center justify-center">
        <ChevronRightIcon size={16} color="#9CA3AF" />
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList<GroupItem>
      data={groups}
      keyExtractor={(item, index) => `${item.name}-${index}`}
      renderItem={renderItem}
      contentContainerStyle={{ paddingTop: 12 }}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <View className="items-center justify-center mt-20">
          <Search size={48} color="#9CA3AF" />
          <Text className="text-center text-gray-500 mt-2 font-medium">
            No Chat Group Available
          </Text>
        </View>
      }
    />
  );
};

export default Chat;
