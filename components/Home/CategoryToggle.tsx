import { View, Text, FlatList } from "react-native";
import React from "react";

interface category {
  id: any;
  name: String;
}
interface propsInterface {
  categories: category[];
}

const CategoryToggle = ({ categories }: propsInterface) => {
  return (
    <View className="flex-row py-3 gap-3">
      <FlatList
        style={{ width: "90%", margin: "auto" }}
        data={categories}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View className="p-3 mr-3 rounded-full border-2 border-black">
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default CategoryToggle;
