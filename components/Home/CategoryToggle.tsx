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
            className={`p-3 mx-2 rounded-full border-2 ${item.id === activeTab ? 'bg-red-500 text-white border-red-500' : 'border-black'}`}
            onPress={() => setActiveTab(item.id)}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? 'rgba(255, 0, 0, 0.2)' : 'transparent',
              },
            ]}
          >
            <Text className={`text-sm first-letter:uppercase ${item.id === activeTab ? 'font-bold text-white' : ''}`}>
              {item.name}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
};

export default CategoryToggle;
