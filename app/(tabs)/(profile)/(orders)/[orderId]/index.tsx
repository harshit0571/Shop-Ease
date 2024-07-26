import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const index = () => {
  const { orderId } = useLocalSearchParams();
  return (
    <View>
      <Text>index</Text>
    </View>
  );
};

export default index;
