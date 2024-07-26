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
        name="Address"
        options={{ header: () => <CommonHeader title="Address" /> }}
      />
      <Stack.Screen
        name="Payment"
        options={{ header: () => <CommonHeader title="Payment" /> }}
      />
      <Stack.Screen
        name="OrderConfirmed"
        options={{ headerShown:false }}
      />
    </Stack>
  );
};

export default _layout;
