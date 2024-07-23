import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";

interface productInterface {
  title: string;
  price: number;
  images: string[];
  id: any;
}

const ProductCard = ({ title, price, images, id }: productInterface) => {
  const router = useRouter();

  return (
    <Pressable
      className="flex flex-col h-max w-[50%] my-2 justify-center"
      onPress={() => router.push("/" + id+"/Display")}
    >
      <Image
        source={{ uri: images[0] }}
        className="h-[250px] w-[90%] rounded-lg shadow-lg"
      />
      <Text className="font-semibold text-md my-1">{title}</Text>
      <Text className="font-semibold text-lg">₹{price}</Text>
    </Pressable>
  );
};

export default ProductCard;
