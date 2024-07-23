import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { Image } from "expo-image";

const Index = () => {
  const { productId } = useLocalSearchParams();
  const [selectedImage, setSelectedImage] = useState(0);
  console.log(productId, "id");
  const [product, setProduct] = useState<any>(null);
  useEffect(() => {
    const getProduct = async () => {
      const docRef = doc(db, "Products", productId?.toString() || "");
      const snapShot = await getDoc(docRef);
      setProduct(snapShot.data());
    };

    getProduct();
  }, []);
  return (
    // <SafeAreaView className="flex-1 bg-red-400">
  
      <ScrollView className="flex-1 w-full">
      <View className="w-full flex-1">
        <Image
          contentFit="cover"
          source={{ uri: product?.images[selectedImage] }}
          className="w-full flex-1 h-[350px]"
        />
      </View>
        <View className="h-max w-full flex flex-row gap-3 p-3">
          {product?.images.map((image: string, index: number) => (
            <TouchableOpacity onPress={() => setSelectedImage(index)}>
              <Image
                contentFit="cover"
                source={{ uri: image }}
                className="w-[60px] h-[60px] border-solid border-black border-2 rounded-xl shadow-lg shadow-black"
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    // </SafeAreaView>
  );
};

export default Index;
