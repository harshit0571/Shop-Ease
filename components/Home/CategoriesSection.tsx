import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import CategoryToggle from "./CategoryToggle";
import { getCategories } from "@/context/CategoriesProvider";

const CategoriesSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { categories } = getCategories();
  console.log(categories);
  return (
    <View className=" w-[90%] m-auto my-5 px-2 rounded-lg flex-col">
      <Text className="text-xl font-bold">Shop By Categories</Text>
      <CategoryToggle
        categories={categories}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </View>
  );
};

export default CategoriesSection;
