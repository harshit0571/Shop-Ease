import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import CommonHeader from "@/components/common/CommonHeader";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="Cart"
        options={{ header: () => <CommonHeader title="Your Cart" /> }}
      />
      <Stack.Screen
        name="Checkout"
        options={{ header: () => <CommonHeader title="Checkout" /> }}
      />
    </Stack>
  );
};

export default _layout;
