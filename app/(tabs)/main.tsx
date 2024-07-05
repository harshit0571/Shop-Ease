import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Home/Header";
import Jumbotron from "@/components/Home/Jumbotron";

const main = () => {
  return (
    <SafeAreaView>
      <Header />
      <Jumbotron />
    </SafeAreaView>
  );
};

export default main;
