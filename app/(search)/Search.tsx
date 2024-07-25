import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import PreviousSearches from "@/components/search/PreviousSearches";

const Search = () => {
  const router = useRouter();

  return (
    <SafeAreaView>
      <View className="flex flex-row w-full px-3 gap-2 items-center">
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={30} />
        </TouchableOpacity>
        <TextInput
          placeholder="search"
          keyboardAppearance="light"
          className=" bg-gray-200 z- w-auto flex-1 p-2 py-3 rounded-lg flex flex-row items-center"
        />
      </View>

      <PreviousSearches />
    </SafeAreaView>
  );
};

export default Search;
