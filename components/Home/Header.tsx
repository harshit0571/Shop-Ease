import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";

const Header = () => {
  const router = useRouter();
  return (
    <View className="flex flex-row justify-around  h-[70px]  pb-2 items-center gap-3 px-6 mt-3 ">
      <TouchableOpacity
        onPress={() => {
          router.push("(search)/Search");
        }}
        className="flex-grow"
      >
        <View className=" bg-gray-200 w-auto flex-1 p-2 py-3 rounded-lg flex flex-row items-center">
          <AntDesign name="search1" size={15} />
          <Text className="ml-1">Search</Text>
        </View>
      </TouchableOpacity>

      <AntDesign name="bells" size={30} />
      <TouchableOpacity onPress={() => router.push("/Cart")}>
        <AntDesign name="shoppingcart" size={30} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
