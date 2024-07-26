import { View, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const OrderConfirmed = () => {
  const OrderData = useSelector((state: RootState) => state.cart.orderData);
  const CartData = useSelector((state: RootState) => state.cart.cartItems);

  console.log(OrderData, CartData);
  return (
    <View>
      <Text>OrderConfirmed</Text>
    </View>
  );
};

export default OrderConfirmed;
