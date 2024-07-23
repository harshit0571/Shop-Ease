import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { Button } from "react-native";
import CustomHeader from "@/components/Product/CustomHeader";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="[productId]/Display"
        options={{
          header: () => <CustomHeader />,
        }}
      />
    </Stack>
  );
};

export default _layout;
