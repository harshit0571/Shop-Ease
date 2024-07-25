import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="Search" options={{ headerShown: false }} />
      <Stack.Screen
        name="[searchText]/SearchPage"
        options={{ title: "Search Results", headerBackTitle: "" }}
      />
    </Stack>
  );
};

export default _layout;
