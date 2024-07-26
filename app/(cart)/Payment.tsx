import { View, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Payment = () => {
  const OrderData = useSelector((state: RootState) => state.cart.orderData);
  console.log(OrderData);
  return (
    <View>
      <Text>Payment</Text>
    </View>
  );
};

export default Payment;
