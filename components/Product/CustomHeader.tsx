import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { addDoc, collection, setDoc, Timestamp } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import favourites from "@/app/(tabs)/favourites";
import { fetchFavourites } from "@/redux/favourites/favouritesSlice";
import { AppDispatch, RootState } from "@/redux/store";

const CustomHeader = () => {
  const router = useRouter();
  const { productId } = useLocalSearchParams();

  const addToFavourites = async () => {
    try {
      await addDoc(collection(db, "favourites"), {
        pID: productId,
        date: new Date().toISOString(),
      });
    } catch (error) {}
  };
  const dispatch = useDispatch<AppDispatch>();
  const favourites = useSelector(
    (state: RootState) => state.favourites.favourites
  );

  useEffect(() => {
    dispatch(fetchFavourites());
  }, [dispatch]);

  return (
    <SafeAreaView className="flex flex-row px-5 pt-0 pb-[-15]  bg-red-500 w-full  justify-between items-center">
      <TouchableOpacity
        className=" flex justify-center  items-center"
        onPress={() => router.back()}
      >
        <AntDesign name="arrowleft" size={30} color={"white"} />
      </TouchableOpacity>
      <StatusBar barStyle={"light-content"} />
      <Text className="text-2xl text-white font-bold">Product Details</Text>
      <TouchableOpacity
        className="flex justify-center items-center"
        onPress={() => addToFavourites()}
      >
        <AntDesign name="hearto" size={30} color={"white"} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CustomHeader;
