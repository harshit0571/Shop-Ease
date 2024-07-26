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
import { useLocalSearchParams, useRouter } from "expo-router";
import { addDoc, collection, setDoc, Timestamp } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavourites,
  fetchFavourites,
  removeFromFavourites,
} from "@/redux/favourites/favouritesSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useAuth } from "@clerk/clerk-expo";

const CustomHeader = () => {
  const router = useRouter();
  const { productId } = useLocalSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const { userId } = useAuth();
  console.log(userId, "id");

  const handleAddToFavourites = () => {
    if (userId) {
      dispatch(
        addToFavourites({ productId: productId as string, userId: userId })
      );
    }
  };

  const handleRemoveFromFavourites = (id: string) => {
    dispatch(removeFromFavourites(id));
  };

  const favourites = useSelector(
    (state: RootState) => state.favourites.favourites
  );

  useEffect(() => {
    dispatch(fetchFavourites(userId as string));
  }, [dispatch]);

  const favourite = favourites.find((doc) => doc.pID === productId);

  return (
    <SafeAreaView className="flex flex-row px-5 pt-0 pb-[-15]  bg-red-500 w-full  justify-between items-center">
      <TouchableOpacity
        className="flex justify-center items-center"
        onPress={() => router.back()}
      >
        <AntDesign name="arrowleft" size={30} color={"white"} />
      </TouchableOpacity>
      <StatusBar barStyle={"light-content"} />
      <Text className="text-2xl text-white font-bold">Product Details</Text>
      <View className="flex flex-row gap-3">
        {favourite ? (
          <TouchableOpacity
            className="flex justify-center items-center"
            onPress={() => handleRemoveFromFavourites(favourite.id)}
          >
            <AntDesign name="heart" size={30} color={"white"} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className="flex justify-center items-center"
            onPress={handleAddToFavourites}
          >
            <AntDesign name="hearto" size={30} color={"white"} />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={()=>router.push('/Cart')}>
          <AntDesign name="shoppingcart" size={30} color={"white"} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CustomHeader;
