import {
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Text,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PreviousSearches from "@/components/search/PreviousSearches";
import Searches from "@/components/search/Searches";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebaseConfig";

const Search = () => {
  const router = useRouter();
  const [searchVal, setSearchVal] = useState<string>("");
  const [isTyping, setIsTyping] = useState(false);
  useEffect(() => {
    const loadSearchVal = async () => {
      try {
        const storedSearchVal = await AsyncStorage.getItem("searchVal");
        if (storedSearchVal) {
          setSearchVal(storedSearchVal);
        }
      } catch (error) {
        console.error("Failed to load search value from storage:", error);
      }
    };

    loadSearchVal();
  }, []);

  const handleSearchChange = (value: string) => {
    setIsTyping(value.length > 0);
    getSearches();
    setSearchVal(value);
  };
  const [buttonClicked, setButtonClicked] = useState(0);

  const handleSearchSubmit = async () => {
    try {
      const storedSearches = await AsyncStorage.getItem("searchArray");
      const searchArray = storedSearches ? JSON.parse(storedSearches) : [];
      if (searchVal && !searchArray.includes(searchVal)) {
        searchArray.push(searchVal);
      }
      await AsyncStorage.setItem("searchArray", JSON.stringify(searchArray));
      setSearchVal("");
      setButtonClicked(buttonClicked + 1);
      Keyboard.dismiss();
    } catch (error) {
      console.error("Failed to save search value to storage:", error);
    }
  };
  const [searchData, setSearchData] = useState<any>([]);
  const getSearches = async () => {
    try {
      const productsRef = collection(db, "Products");
      const q = query(
        productsRef,
        where("name", ">=", searchVal),
        where("name", "<=", searchVal + "z")
      );
      const data = await getDocs(q);
      const array = data.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      }));
      //   console.log(array, "s");
      setSearchData(array);
    } catch (error) {
      console.error("Error fetching products: ", error);
      return [];
    }
  };

  return (
    <SafeAreaView>
      <View className="flex flex-row w-full px-3 gap-2 items-center">
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={30} />
        </TouchableOpacity>
        <TextInput
          placeholder="search"
          value={searchVal}
          onChangeText={handleSearchChange}
          onSubmitEditing={handleSearchSubmit}
          keyboardAppearance="light"
          className="bg-gray-200 w-auto flex-1 p-2 py-3 rounded-lg"
        />
        <TouchableOpacity onPress={handleSearchSubmit} className=" rounded-lg">
          <AntDesign name="search1" size={30} color={"black"} />
        </TouchableOpacity>
      </View>
      {isTyping ? (
        <Searches searchData={searchData} />
      ) : (
        <PreviousSearches reRender={buttonClicked} />
      )}
    </SafeAreaView>
  );
};

export default Search;
