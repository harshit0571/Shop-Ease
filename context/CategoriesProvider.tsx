import { View, Text } from "react-native";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/firebaseConfig";

interface category {
  id: any;
  name: String;
}
interface CategoryContextType {
  categories: category[];
  setCategories: React.Dispatch<React.SetStateAction<category[]>>;
}
const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined
);

export const getCategories = () => {
  return useContext(CategoryContext);
};

const CategoriesProvider = (children: any) => {
  const [categories, setCategories] = useState<category[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesSnapShot = await getDocs(collection(db, "categories"));
      let categoriesList: category[] = [];
      categoriesSnapShot.forEach((docs) => [
        ...categoriesList,
        {
          id: docs.id,
          name: docs.data().name,
        },
      ]);
      setCategories(categoriesList);
    };
    fetchCategories();
  }, []);
  return (
    <CategoryContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoriesProvider;
