import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PreviousSearches = ({ reRender }: { reRender: number }) => {
  const [searches, setSearches] = useState<string[]>([]);

  useEffect(() => {
    const fetchSearches = async () => {
      try {
        const storedSearches = await AsyncStorage.getItem("searchArray");
        if (storedSearches) {
          setSearches(JSON.parse(storedSearches).reverse());
        }
        console.log(storedSearches, "dss");
      } catch (error) {
        console.error("Failed to load previous searches from storage:", error);
      }
    };

    fetchSearches();
  }, [reRender]);

  const handleDelete = async (search: string) => {
    const updatedSearches = searches.filter((item) => item !== search);
    setSearches(updatedSearches);
    try {
      await AsyncStorage.setItem(
        "searchArray",
        JSON.stringify(updatedSearches)
      );
    } catch (error) {
      console.error("Failed to save updated searches to storage:", error);
    }
  };

  return (
    <View className="flex flex-col py-2 px-2 border-t-2 border-gray-400 w-[95%] m-auto mt-6">
      <Text className="text-gray-700">Previous Searches</Text>
      <FlatList
        data={searches}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View className="flex flex-row justify-between items-center mt-2">
            <TouchableOpacity className="flex flex-row gap-1 items-center flex-1">
              <AntDesign name="search1" size={20} color={"purple"} />
              <Text className="text-lg text-purple-800">{item}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item)}>
              <AntDesign name="close" size={20} color={"purple"} />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default PreviousSearches;
