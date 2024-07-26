import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";

const CommonHeader = ({ title }: { title: string }) => {
  const router = useRouter();
  return (
    <SafeAreaView className="flex flex-row px-5 pt-0 pb-[-15] bg-red-500 w-full justify-between items-center">
      <TouchableOpacity
        className="flex justify-center items-center"
        onPress={() => router.back()}
      >
        <AntDesign name="arrowleft" size={30} color={"white"} />
      </TouchableOpacity>
      <StatusBar barStyle={"light-content"} />
      <Text className="text-2xl text-white font-bold text-center ">{title}</Text>
      <View></View>
    </SafeAreaView>
  );
};

export default CommonHeader;
