import { View, Text, TextInput } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

const Header = () => {
  return (
    <View className="flex flex-row justify-around items-center gap-3 px-6 mt-3 ">
     <TextInput placeholder="search" className=" bg-gray-200 w-auto flex-1 p-2 py-3 rounded-lg"/>
     <AntDesign name="bells" size={30}/>
     <AntDesign name="shoppingcart" size={30}/>
    </View>
  );
};

export default Header;
