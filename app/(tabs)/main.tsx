import { View, Text, ScrollView, StatusBar } from "react-native";
import React, { useEffect } from "react";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Home/Header";
import Jumbotron from "@/components/Home/Jumbotron";
import BrandsScroll from "@/components/Home/BrandsScroll";
import CategoriesSection from "@/components/Home/CategoriesSection";
import { useAuth, useClerk } from "@clerk/clerk-expo";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchCartItems } from "@/redux/cart/cartSlice";

const main = () => {
  const brands = [
    {
      id: "1",
      label: "Nike",
      ImgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVFEPT0IEupxAzWKtJOfsnF3Q3qyiQZNuDTw&s",
    },
    {
      id: "2",
      label: "New Balance",
      ImgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLh9RSOqy0SyVAd2DlDUWcqiSG2kZGeh71nw&s",
    },
    {
      id: "3",
      label: "Reebok",
      ImgUrl:
        "https://i.pinimg.com/736x/d5/82/3e/d5823e979dcc07405154c72f9210c1aa.jpg",
    },
    {
      id: "4",
      label: "Adidas",
      ImgUrl:
        "https://static.vecteezy.com/system/resources/previews/010/994/474/original/adidas-symbol-logo-white-clothes-design-icon-abstract-football-illustration-with-red-background-free-vector.jpg",
    },
    {
      id: "5",
      label: "Puma",
      ImgUrl:
        "https://static.vecteezy.com/system/resources/previews/021/963/704/original/puma-logo-illustration-free-vector.jpg",
    },
  ];

  const { userId } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (userId) {
      dispatch(fetchCartItems(userId.toString()));
    }
  }, [dispatch, userId]);
  return (
    <SafeAreaView className="flex-1">
      <Header />
      <StatusBar barStyle={"dark-content"} />
      <ScrollView>
        <Jumbotron
          imageUrl="https://thumbs.dreamstime.com/b/red-converse-shoes-hanging-red-wall-pair-red-converse-shoes-suspended-red-wall-ai-generated-306691318.jpg"
          title="Converse X DRKSHDW"
          description="Fashion Designer Rick Owens distorts and reshapes an icon."
          buttonText="Shop Now"
          onPress={() => console.log("Button Pressed")}
        />
        <BrandsScroll brands={brands} />
        <CategoriesSection />
      </ScrollView>
    </SafeAreaView>
  );
};

export default main;
