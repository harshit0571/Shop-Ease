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
const CategoryContext = createContext<CategoryContextType>({
  categories: [],
  setCategories: () => {},
});

export const getCategories = () => {
  return useContext(CategoryContext);
};

const CategoriesProvider = ({ children }: any) => {
  const [categories, setCategories] = useState<category[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesSnapShot = await getDocs(collection(db, "categories"));
      const categoriesList: category[] = categoriesSnapShot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      }));

      setCategories(categoriesList);
      console.log(categoriesList);
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
