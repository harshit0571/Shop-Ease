import { View, Text } from "react-native";
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
  console.log(productList);
  return (
    <View className="flex flex-row flex-wrap gap-3 mt-5">
      {productList?.map((product: productInterface) => (
        <ProductCard
          key={product.id}
          title={product.title}
          price={product.price}
          images={product.images}
          id={product.id}
        />
      ))}
    </View>
  );
};

export default ProductCardContainer;
