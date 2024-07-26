import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import Entypo from "@expo/vector-icons/Entypo";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { setOrderData } from "@/redux/cart/cartSlice";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { useAuth } from "@clerk/clerk-expo";

const Payment = () => {
  const dispatch = useDispatch<AppDispatch>();
  const OrderData = useSelector((state: RootState) => state.cart.orderData);
  const CartData = useSelector((state: RootState) => state.cart.cartItems);

  console.log(OrderData);
  const [selectedMode, setSelectedMode] = useState(null);
  const RenderItem = ({ item }: { item: any }) => (
    <View className="flex-1 my-3 flex  flex-row items-center w-full h-max shadow-lg border-2 border-gray-100  p-4 mb-2 rounded">
      <View className="w-max mr-3">{item.icon}</View>
      <View className=" w-[80%] ">
        <Text className="text-lg font-bold">{item.name}</Text>
      </View>
      <View></View>
      <BouncyCheckbox
        size={25}
        fillColor="red"
        unFillColor="#FFFFFF"
        iconStyle={{ borderColor: "red" }}
        innerIconStyle={{ borderWidth: 2 }}
        className="absolute right-0"
        isChecked={selectedMode === item.name}
        textStyle={{ fontFamily: "JosefinSans-Regular" }}
        onPress={() =>
          setSelectedMode(selectedMode === item.name ? null : item.name)
        }
      />
    </View>
  );
  const router = useRouter();
  const paymentMethods = [
    {
      id: 1,
      name: "Cash",
      icon: <Entypo name="credit" size={30} color={"red"} />,
    },
    {
      id: 2,
      name: "Wallet",
      icon: <Entypo name="wallet" size={30} color={"red"} />,
    },
    {
      id: 3,
      name: "Card",
      icon: <Entypo name="credit-card" size={30} color={"red"} />,
    },
  ];
  const { userId } = useAuth();
  const placeOrder = async () => {
    dispatch(
      setOrderData({
        paymentMode: selectedMode || "",
      })
    );
    const filteredCartData = CartData.map(({ date, ...rest }) => rest);

    const docRef = await addDoc(collection(db, "orders"), {
      ...OrderData,
      orderDetails: filteredCartData,
      uid: userId,
      date: new Date().toISOString(),
    });

    router.push("/OrderConfirmed");
  };
  return (
    <View className="bg-white flex-1">
      <FlatList
        data={paymentMethods}
        renderItem={({ item }) => <RenderItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
      <View className="absolute bottom-0 left-0 flex items-center right-0 p-4 h-[100px] ">
        <TouchableOpacity
          className={
            " bg-red-500 py-2 px-6 rounded-full " +
            (selectedMode === null && "bg-gray-400")
          }
          disabled={selectedMode === null}
          onPress={() => placeOrder()}
        >
          <Text className="text-white text-2xl">Confirm Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Payment;
