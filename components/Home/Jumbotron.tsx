import { View, Text, Pressable, ImageBackground } from "react-native";
import React from "react";

interface propInterface {
  imageUrl: string;
  title: string;
  description: string;
  buttonText: string;
  onPress: () => void;
}
const Jumbotron = ({
  imageUrl,
  title,
  description,
  buttonText,
  onPress,
}: propInterface) => {
  return (
    <View className="bg-red-400 w-[90%] m-auto my-5 rounded-lg flex-row">
      <ImageBackground source={{ uri: imageUrl }} className="flex-1 rounded-lg">
        <View className="flex-col w-[60%] gap-4 p-3">
          <Text className="text-3xl text-white font-semibold">{title}</Text>
          <Text className="text-sm text-white font-semibold">
            {description}
          </Text>
          <Pressable
            className="p-2 bg-red-500 border-2 border-black max-w-[100px] rounded-2xl"
            onPress={onPress}
          >
            <Text className="text-white text-center max-w-[100px]">
              {buttonText}
            </Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Jumbotron;
