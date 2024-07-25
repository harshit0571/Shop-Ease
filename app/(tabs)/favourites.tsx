import { View, Text, ActivityIndicator, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "@/components/Product/CustomHeader";
import CategoriesSection from "@/components/Home/CategoriesSection";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  collection,
  getDocFromCache,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import ProductCard from "@/components/common/ProductCard";
import { fetchFavourites } from "@/redux/favourites/favouritesSlice";

const favourites = () => {
  const favourites = useSelector(
    (state: RootState) => state.favourites.favourites
  );

  const [products, setProducts] = useState<any>([]); // New state for products
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchFavourites());
  }, [dispatch]);
  useEffect(() => {
    const getProducts = async () => {
      if (favourites.length > 0) {
        // Get all product IDs from favourites
        const productIds = favourites.map((fav: any) => fav.pID);

        // Query to fetch products based on IDs
        const productsCollection = collection(db, "Products");
        const productsQuery = query(
          productsCollection,
          where("__name__", "in", productIds)
        );

        const productsSnapshot = await getDocs(productsQuery);
        const productsList = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(productsList);
        console.log(productsList, "wdokring");
      }
    };
    getProducts();
  }, [favourites]);
  return (
    <SafeAreaView className="flex justify-center flex-col p-5 flex-1 items-center w-full">
      <Text className="text-3xl mb-10">My Favourites</Text>
      {!favourites ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
  

        <FlatList
          data={products}
          numColumns={2}
          renderItem={({ item }) => (
          
              <ProductCard
                key={item.id}
                title={item.name}
                price={item.price}
                images={item.images}
                id={item.id}
              />
       
          )}
          keyExtractor={(item) => item.id}
        />
               
      )}
    </SafeAreaView>
  );
};

export default favourites;
