import { View, Text } from "react-native";
import React from "react";
import CategoryToggle from "./CategoryToggle";

const CategoriesSection = () => {
  const categories = [
    { name: "Footwear", id: 1 },
    { name: "Clothing", id: 2 },
    { name: "Accessories", id: 3 },
    { name: "Home", id: 4 },
  ];
  return (
    <View className=" w-[90%] m-auto my-5 px-2 rounded-lg flex-col">
      <Text className="text-xl font-bold">Shop By Categories</Text>
      <CategoryToggle categories={categories} />
    </View>
  );
};

export default CategoriesSection;
