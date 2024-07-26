import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import CommonHeader from "@/components/common/CommonHeader";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ header: () => <CommonHeader title="Profile" /> }}
      />
    </Stack>
  );
};

export default _layout;
