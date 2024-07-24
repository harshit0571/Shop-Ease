import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
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
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

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

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const renderDescription = () => {
    const maxLength = 200;
    if (
      isDescriptionExpanded ||
      !product?.description ||
      product?.description.length <= maxLength
    ) {
      return product?.description;
    } else {
      return `${product?.description.substring(0, maxLength)}...`;
    }
  };

  return (
    // <SafeAreaView className="flex-1 bg-red-400">

    <>
      {product ? (
        <ScrollView className="flex-1 bg-white w-full">
          <View className="w-full flex-1 relative flex justify-center items-center">
            <Carousel
              loop
              width={width}
              height={350}
              autoPlay={false}
              data={product?.images}
              scrollAnimationDuration={3000}
              mode="parallax"
              pagingEnabled={true}
              defaultIndex={selectedImage}
              onSnapToItem={(index) => setSelectedImage(index)}
              renderItem={({
                item,
                index,
              }: {
                item: string;
                index: number;
              }) => (
                <View
                  key={index}
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
            <Text className="text-lg font-bold mt-5">Product Details</Text>
            <Text className="text-lg">{renderDescription()}</Text>
            {product?.description && product?.description.length > 200 && (
              <TouchableOpacity onPress={toggleDescription}>
                <Text className="text-gray-500">
                  {isDescriptionExpanded ? "Read Less" : "Read More"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      ) : (
        <ActivityIndicator />
      )}
    </>
    // </SafeAreaView>
  );
};

export default Index;
