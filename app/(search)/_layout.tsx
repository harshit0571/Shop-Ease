import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import CustomHeader from "@/components/Product/CustomHeader";
import CommonHeader from "@/components/common/CommonHeader";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="Search" options={{ headerShown: false }} />
      <Stack.Screen
        name="[searchText]/SearchPage"
        options={{ header: () => <CommonHeader title="search results" /> }}
      />
      <Stack.Screen
        name="[category]/CategoryDisplay"
        options={{ header: () => <CommonHeader title="search results" /> }}
      />
    </Stack>
  );
};

export default _layout;
