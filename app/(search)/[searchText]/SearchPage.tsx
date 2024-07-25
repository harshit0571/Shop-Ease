import { View, Text, ActivityIndicator, FlatList } from "react-native";
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
import ProductCard from "@/components/common/ProductCard";
import ProductCard2 from "@/components/common/ProductCard2";

const SearchPage = () => {
  const { searchText } = useLocalSearchParams();
  const [searchData, setSearchData] = useState<any>([]);
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
        const tagQuery = query(
          tagRef,
          where("name", "in", textarray),
          limit(10)
        );

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
          (pid) => pidCount[pid] == 1
        );

        const commonProducts = [];
        for (const pid of commonPids) {
          console.log(pid, "d");
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

        setSearchData(mergedProducts);

        console.log(array, "done");
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchSearches();
  }, []);

  return (
    <View className="flex justify-center flex-col p-5 flex-1 items-center w-full">
      {!searchData ? (
        <ActivityIndicator size="large" color="#0000ff" />
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
