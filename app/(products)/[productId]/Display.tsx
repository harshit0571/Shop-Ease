import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  const { productId } = useLocalSearchParams();
  console.log(productId, "id");
  return (
    <SafeAreaView>
      <Text>{productId} sdsddsddssd</Text>
    </SafeAreaView>
  );
};

export default Index;
