import { View, Text, FlatList, Image } from "react-native";
import React from "react";

interface propsInterface {
  brands: any;
}
const BrandsScroll = ({ brands }: propsInterface) => {
  return (
    <View>
      <FlatList
        style={{ width: "90%", margin: "auto" }}
        data={brands}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View className="mx-3 outline-3  flex-col justify-center items-center outline-red-300">
            <Image
              source={{ uri: item.ImgUrl }}
              className="w-max h-max min-w-[60px] min-h-[60px] rounded-full mb-2 font-bold"
            />

            <Text className="font-semibold">{item.label}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default BrandsScroll;
