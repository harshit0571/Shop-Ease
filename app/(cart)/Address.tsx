import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import BouncyCheckbox from "react-native-bouncy-checkbox";

// Dummy data for addresses
const addresses = [
  { id: "1", name: "Home", location: "123 Main St" },
  { id: "2", name: "Work", location: "456 Office Rd" },
  // Add more addresses as needed
];

const RenderItem = ({ item }: { item: any }) => (
  <View className="flex-1 flex flex-row items-center w-full h-max border-b-2 border-gray-200 justify-between  p-4 mb-2 rounded">
    <View className="">
      <Entypo name="location-pin" size={40} color={"red"} />
    </View>
    <View className="flex-grow w-[100px] ">
      <Text className="text-lg font-bold">{item.name}</Text>
      <Text>{item.location}</Text>
    </View>
    <BouncyCheckbox
      size={25}
      fillColor="red"
      unFillColor="#FFFFFF"
      iconStyle={{ borderColor: "red" }}
      innerIconStyle={{ borderWidth: 2 }}
      className="absolute right-0"
      textStyle={{ fontFamily: "JosefinSans-Regular" }}
      onPress={(isChecked: boolean) => {
        console.log(isChecked);
      }}
    />
  </View>
);

const Cart = () => {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white p-4 ">
      <FlatList
        data={addresses}
        renderItem={({ item }) => <RenderItem item={item} />}
        keyExtractor={(item) => item.id}
        ListFooterComponent={() => (
          <TouchableOpacity
            className="mt-4 p-4 bg-white rounded flex flex-row items-center justify-center border-dotted border-red-500 border-2"
            onPress={() => router.push("/addressForm")}
          >
            <AntDesign name="plus" size={24} color={"red"} />
            <Text className="text-red-500 text-lg ml-2">Add New Address</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Cart;
