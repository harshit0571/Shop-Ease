import { View, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ConfettiCannon from "react-native-confetti-cannon";
import AntDesign from "@expo/vector-icons/AntDesign";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const OrderConfirmed = () => {
  const OrderData = useSelector((state: RootState) => state.cart.orderData);
  const CartData = useSelector((state: RootState) => state.cart.cartItems);
  const router = useRouter();
  console.log(OrderData, CartData);
  return (
    <>
      <ConfettiCannon
        count={300}
        origin={{ x: -10, y: 20 }}
        autoStartDelay={0}
        autoStart={true}
      />
      <View className="flex-1 justify-center items-center ">
        <AntDesign name="checkcircle" size={100} color={"red"} />
        <Text className="text-4xl mt-10">Order Confirmed</Text>
        <Text className="text-xl">Thanks for your purchase!!!</Text>
        <View className="absolute bottom-10 left-0 flex items-center right-0 p-4 h-[100px] ">
          <TouchableOpacity
            className=" bg-red-500 py-2 px-6 rounded-full "
            onPress={() => router.push("/main")}
          >
            <Text className="text-white text-2xl">Shop More</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default OrderConfirmed;
