import { View, Text, Pressable, Image, ImageBackground } from "react-native";
import React from "react";

const Jumbotron = () => {
  return (
    <View className="bg-red-400  w-[90%] m-auto my-5 rounded-lg flex-row">
      <ImageBackground source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS957jJ7dRg7H4KLHnjMRgSjyac40U6zR0EvA&s"}} className="flex-1 rounded-lg" >
        <View className="flex-col w-[50%] gap-4 p-3">
          <Text className="text-3xl text-white font-semibold">
            Converse X DRKSHDW
          </Text>
          <Text className="text-sm text-white font-semibold">
            Fashion Designer Rick Owns, disorts and reshapes an icon
          </Text>
          <Pressable className="p-2 bg-red-500 border-2 border-black max-w-[100px] rounded-2xl">
            <Text className="text-white text-center max-w-[100px]">
              Shop Now
            </Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Jumbotron;
