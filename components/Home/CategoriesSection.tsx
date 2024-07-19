import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import CategoryToggle from "./CategoryToggle";
import { getCategories } from "@/context/CategoriesProvider";
import { query, collection, where, limit, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";

const CategoriesSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { categories } = getCategories();
  console.log(categories);
  const [productList, setProductList] = useState(null);

  const getProducts = async () => {
    const q = query(
      collection(db, "Products"),
      where("category", "==", activeTab)
    );

    const snapShot = await getDocs(q);
    const list = snapShot.docs.map((doc) => ({
      id: doc.id,
      title: doc.data().name,
      images: doc.data().images,
      price: doc.data().price,
    }));

    console.log(list);
  };

  useEffect(() => {
    getProducts();
  }, [activeTab]);
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
