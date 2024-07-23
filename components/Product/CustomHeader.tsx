import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";

const CustomHeader = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="flex flex-row px-5 bg-white h-max w-full justify-between items-center">
      <TouchableOpacity
        className="bg-white rounded-full p-2 flex justify-center items-center"
        onPress={() => router.back()}
      >
        <AntDesign name="arrowleft" size={30} />
      </TouchableOpacity>

      <Text className="text-2xl">Product Details</Text>
      <TouchableOpacity className="bg-white rounded-full p-2 flex justify-center items-center">
        <AntDesign name="hearto" size={30} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CustomHeader;
