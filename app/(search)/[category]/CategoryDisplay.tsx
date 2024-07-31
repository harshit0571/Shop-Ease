import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import ProductCard2 from "@/components/common/ProductCard2";
import { and, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebaseConfig";

const CategoryDisplay = () => {
  const { category } = useLocalSearchParams();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [sortOption, setSortOption] = useState("asc");
  const [refreshing, setRefreshing] = useState(false);

  const fetchProducts = async () => {
    setRefreshing(true);
    setLoading(true);
    try {
      const q = query(
        collection(db, "Products"),
        and(where("category", "==", category), where("listed", "==", true))
      );
      const querySnapshot = await getDocs(q);
      const fetchedProducts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [category]);

  useEffect(() => {
    if (sortOption === "asc") {
      setProducts((prevProducts) =>
        [...prevProducts].sort((a, b) => a.price - b.price)
      );
    } else if (sortOption === "desc") {
      setProducts((prevProducts) =>
        [...prevProducts].sort((a, b) => b.price - a.price)
      );
    }
  }, [sortOption]);

  if (loading) {
    return <ActivityIndicator size="large" color="red" />;
  }

  return (
    <View className="flex-1 p-5">
      <View className="mb-4">
        <TouchableOpacity
          className="px-4 rounded"
          onPress={() => setShowSortOptions(!showSortOptions)}
        >
          <Text className="text-black text-lg">Sort By:</Text>
        </TouchableOpacity>
        {showSortOptions && (
          <View className="mt-4">
            <View className="flex-row ml-3">
              <TouchableOpacity
                className={`py-2 px-4 rounded mr-2 ${
                  sortOption === "asc" ? "bg-red-500" : "bg-gray-400"
                }`}
                onPress={() => {
                  setSortOption("asc");
                  setShowSortOptions(false);
                }}
              >
                <Text className="text-white text-sm">Price: Low to High</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`py-2 px-4 rounded ${
                  sortOption === "desc" ? "bg-red-500" : "bg-gray-400"
                }`}
                onPress={() => {
                  setSortOption("desc");
                  setShowSortOptions(false);
                }}
              >
                <Text className="text-white text-sm">Price: High to Low</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      {products.length === 0 ? (
        <View className="absolute top-40 text-center w-full">
          <Text className="text-center text-2xl">No results found</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          horizontal={false}
          numColumns={2}
          className="flex flex-row flex-wrap"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => fetchProducts()}
            />
          }
          contentContainerStyle={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
          renderItem={({ item }) => (
            <View className="flex-1 flex-grow">
              <ProductCard2
                title={item.name}
                price={item.price}
                images={item.images}
                id={item.id}
              />
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

export default CategoryDisplay;
