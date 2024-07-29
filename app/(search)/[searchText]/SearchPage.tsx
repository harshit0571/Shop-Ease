import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard2 from "@/components/common/ProductCard2";

type SortDirection = "asc" | "desc";

const SearchPage = () => {
  const { searchText } = useLocalSearchParams();
  const [searchData, setSearchData] = useState<any[]>([]);
  const [sortOption, setSortOption] = useState<SortDirection>("asc"); // Default sort option
  const [showSortOptions, setShowSortOptions] = useState(false); // State for sorting options visibility

  useEffect(() => {
    const fetchSearches = async () => {
      try {
        const productsRef = collection(db, "Products");
        const q = query(
          productsRef,
          where("name", ">=", searchText?.toString()),
          where("name", "<=", searchText?.toString() + "z"),
          limit(10)
        );

        const data = await getDocs(q);
        const array = data.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          images: doc.data().images,
          price: doc.data().price,
        }));

        const tagRef = collection(db, "tags");
        const textarray = searchText?.toString().toLowerCase().split(" ");
        const tagQuery = query(tagRef, where("name", "in", textarray));

        const tagData = await getDocs(tagQuery);
        const tags = tagData.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          pids: doc.data().pids || [],
        }));
        const allPids = tags.flatMap((tag) => tag.pids);
        const pidCount = allPids.reduce((acc, pid) => {
          acc[pid] = (acc[pid] || 0) + 1;
          return acc;
        }, {});

        const commonPids = Object.keys(pidCount).filter(
          (pid) => pidCount[pid] === 1
        );

        const commonProducts = [];
        for (const pid of commonPids) {
          const productDoc = await getDoc(doc(db, "Products", pid));
          if (productDoc.exists()) {
            commonProducts.push({
              id: productDoc.id,
              name: productDoc.data().name,
              images: productDoc.data().images,
              price: productDoc.data().price,
            });
          }
        }

        const uniqueProductIds = new Set();

        // Merge initial products and common products while ensuring uniqueness
        const mergedProducts = [...array, ...commonProducts].filter(
          (product) => {
            if (uniqueProductIds.has(product.id)) {
              return false;
            } else {
              uniqueProductIds.add(product.id);
              return true;
            }
          }
        );

        // Sort data based on sortOption
        const sortedProducts = mergedProducts.sort((a, b) => {
          if (sortOption === "asc") {
            return a.price - b.price;
          } else {
            return b.price - a.price;
          }
        });

        setSearchData(sortedProducts);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchSearches();
  }, [sortOption]);

  return (
    <View className="flex-1 p-5">
      <View className="mb-4">
        <TouchableOpacity
          className="  px-4 rounded"
          onPress={() => setShowSortOptions(!showSortOptions)}
        >
          <Text className="text-black text-lg ">Sort By:</Text>
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
                  setShowSortOptions(false); // Hide options after selection
                }}
              >
                <Text className="text-white text-sm">Price: Low to High</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`py-2 px-4 rounded ${
                  sortOption === "desc" ? "bg-red-500" : "bg-gray-400 "
                }`}
                onPress={() => {
                  setSortOption("desc");
                  setShowSortOptions(false); // Hide options after selection
                }}
              >
                <Text className="text-white text-sm">Price: High to Low</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      {!searchData.length ? (
        <ActivityIndicator size="large" color="red" />
      ) : (
        <FlatList
          data={searchData}
          horizontal={false}
          numColumns={2}
          className="flex flex-row flex-wrap"
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

export default SearchPage;
