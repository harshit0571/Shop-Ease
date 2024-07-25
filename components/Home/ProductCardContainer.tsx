import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import ProductCard from "../common/ProductCard";

interface propsInterface {
  productList: any;
}
interface productInterface {
  title: string;
  price: number;
  images: string[];
  id: any;
}
const ProductCardContainer = ({ productList }: propsInterface) => {
  console.log(productList?.length);
  return (
    <View className="flex flex-row flex-wrap gap-3 mt-5">
      {productList?.length > 0 ? (
        productList?.map((product: productInterface) => (
          <ProductCard
            key={product.id}
            title={product.title}
            price={product.price}
            images={product.images}
            id={product.id}
          />
        ))
      ) : (
        <View className="flex justify-center items-center  w-full">
          <ActivityIndicator
            className="text-red-300 m-auto"
            color={"red"}
            size={"large"}
          />
        </View>
      )}
    </View>
  );
};

export default ProductCardContainer;
