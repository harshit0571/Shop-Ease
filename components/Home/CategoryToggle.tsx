import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";

interface category {
  id: any;
  name: String;
}
interface propsInterface {
  categories: category[];
  activeTab: any;
  setActiveTab: any;
}

const CategoryToggle = ({
  categories,
  activeTab,
  setActiveTab,
}: propsInterface) => {
  return (
    <View className="flex-row py-3 gap-3">
      <FlatList
        style={{ width: "90%", margin: "auto" }}
        data={categories}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Pressable
            className={
              "p-3 mr-3 rounded-full border-2 border-black " +
              (index === activeTab &&
                "bg-red-500 text-white font-bold border-red-500")
            }
            onPress={() => setActiveTab(index)}
          >
            <Text className="text-sm first-letter:uppercase">{item.name}</Text>
          </Pressable>
        )}
      />
    </View>
  );
};

export default CategoryToggle;
