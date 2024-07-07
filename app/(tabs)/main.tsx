import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Home/Header";
import Jumbotron from "@/components/Home/Jumbotron";
import BrandsScroll from "@/components/Home/BrandsScroll";

const main = () => {
  return (
    <SafeAreaView>
      <Header />
      <Jumbotron
        imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS957jJ7dRg7H4KLHnjMRgSjyac40U6zR0EvA&s"
        title="Converse X DRKSHDW"
        description="Fashion Designer Rick Owens distorts and reshapes an icon."
        buttonText="Shop Now"
        onPress={() => (
          console.log("Button Pressed")
  )}
      />
      <BrandsScroll/>
    </SafeAreaView>
  );
};

export default main;
