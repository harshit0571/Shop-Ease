import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import CategoryToggle from "./CategoryToggle";
import { getCategories } from "@/context/CategoriesProvider";
import { query, collection, where, limit, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import ProductCardContainer from "./ProductCardContainer";

interface product {
  id: String;
  title: String;
  images: String[];
  price: Number;
  listed: boolean;
}

const CategoriesSection = () => {
  const { categories } = getCategories();
  const [activeTab, setActiveTab] = useState<any>(null);

  console.log(categories);
  const [productList, setProductList] = useState<product[] | null>(null);

  const getProducts = async () => {
    const q = query(
      collection(db, "Products"),
      where("category", "==", activeTab || ""),
      limit(4)
    );

    const snapShot = await getDocs(q);
    const list = snapShot.docs.map((doc) => ({
      id: doc.id,
      title: doc.data().name,
      images: doc.data().images,
      price: doc.data().price,
      listed: doc.data().listed,
    }));
    setProductList(list);
  };

  useEffect(() => {
    if (categories.length > 0) {
      getProducts();
      if (activeTab === null) {
        setActiveTab(categories[0]?.id);
      }
    }
  }, [categories, activeTab]);
  return (
    <View className=" w-[90%] m-auto my-5 px-2 rounded-lg flex-col mb-12">
      <Text className="text-xl font-bold">Shop By Categories</Text>
      <CategoryToggle
        categories={categories}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {productList && <ProductCardContainer productList={productList} />}
    </View>
  );
};

export default CategoriesSection;
