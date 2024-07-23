import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { Image } from "expo-image";
import Carousel from "react-native-reanimated-carousel";

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
  const width = Dimensions.get("window").width;

  return (
    // <SafeAreaView className="flex-1 bg-red-400">

    <ScrollView className="flex-1 bg-white w-full">
      <View className="w-full flex-1 relative flex justify-center items-center">
        <Carousel
          loop
          width={width}
          height={350}
          autoPlay={true}
          data={product?.images}
          scrollAnimationDuration={1000}
          mode="parallax"
          pagingEnabled={true}
        
          defaultIndex={selectedImage}
          onSnapToItem={(index) => setSelectedImage(index)}

          renderItem={({ item, index }: { item: string; index: number }) => (
            <View
              style={{
                flex: 1,
                borderWidth: 1,
                justifyContent: "center",
              }}
            >
              <Image
                contentFit="cover"
                source={{ uri: item }}
                className="w-full flex-1 h-[450px]"
              />
            </View>
          )}
        />
        <View className="h-max m-auto flex   flex-row gap-3 p-3">
          {product?.images.map((image: string, index: number) => (
            <TouchableOpacity onPress={() => setSelectedImage(index)}>
              <Image
                key={index}
                contentFit="cover"
                source={{ uri: image }}
                className="w-[60px] h-[60px] border-solid border-black border-2 rounded-xl shadow-lg shadow-black"
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View className="px-2 flex flex-col gap-2 border-t-2  border-gray-300 mt-1">
        <Text className="text-3xl font-bold text-gray-800">
          {product?.name}
        </Text>
        <Text className="text-xl text-red-500 font-semibold">
          ${product?.price}
        </Text>
        <Text className="text-lg">{product?.description}</Text>
      </View>
    </ScrollView>
    // </SafeAreaView>
  );
};

export default Index;
