import { Search } from "lucide-react-native";
import React, { useState } from "react";
import { TextInput, View } from "react-native";

export const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (text: string) => {
    setSearchQuery(text);
    onSearch(text);
  };

  return (
    <View className="flex-row items-center bg-[#F0F0F0] rounded-xl mx-2 mt-5 px-4 h-12 border border-[#A6A1A1]">
      <Search size={22} color="#888" />
      <TextInput
        value={searchQuery}
        onChangeText={handleChange}
        placeholder="Search across Groups/Chats..."
        placeholderTextColor="#999"
        className="flex-1 ml-3 text-base text-[#333] h-full"
      />
    </View>
  );
};

export default SearchBar;
