import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Home/Header";

const main = () => {
  return (
    <SafeAreaView>
      <Header />
    </SafeAreaView>
  );
};

export default main;
