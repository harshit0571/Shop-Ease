import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";

const Searches = ({ searchData }: { searchData: any }) => {
//   console.log(searchData, "dsd");
  const router = useRouter();
  return (
    <View className="flex flex-col py-2 px-2 border-t-2 border-gray-400 w-[95%] m-auto mt-6">
      <Text className="text-gray-700">Search results</Text>
      <FlatList
        data={searchData}
        keyExtractor={(item: any, index) => index.toString()}
        renderItem={({ item }: { item: any }) => (
          <View className="flex flex-row justify-between items-center mt-2">
            <TouchableOpacity
              className="flex flex-row gap-1 items-center flex-1"
              onPress={() => router.push(item.id + "/Display")}
            >
              <AntDesign name="search1" size={20} color={"purple"} />
              <Text className="text-lg text-purple-800">{item.name}</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => handleDelete(item)}>
              <AntDesign name="close" size={20} color={"purple"} />
            </TouchableOpacity> */}
          </View>
        )}
      />
    </View>
  );
};

export default Searches;
