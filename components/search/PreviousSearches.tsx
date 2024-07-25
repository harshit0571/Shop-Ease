import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

const PreviousSearches = () => {
  return (
    <View className="flex flex-col  py-2 px-2 border-t-2 border-gray-400  w-[95%] m-auto mt-6">
      <Text className="text-gray-700">Previous Searches</Text>
      <View className="flex flex-col mt-2">
        <TouchableOpacity className="flex flex-row justify-between items-center">
          <View className="flex flex-row gap-1 items-center">
            <AntDesign name="search1" size={20} color={"purple"} />
            <Text className="text-lg text-purple-800">sneakers men</Text>
          </View>
          <TouchableOpacity>
            <AntDesign name="close" size={20} color={"purple"} />
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity className="flex flex-row justify-between items-center">
          <View className="flex flex-row gap-1 items-center">
            <AntDesign name="search1" size={20} color={"purple"} />
            <Text className="text-lg text-purple-800">sneakers men</Text>
          </View>
          <TouchableOpacity>
            <AntDesign name="close" size={20} color={"purple"} />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PreviousSearches;
