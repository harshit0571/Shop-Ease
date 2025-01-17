import { View, Text, Platform, Animated } from "react-native";
import React, { useEffect, useState } from "react";
import { Tabs } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          // display: "none",
          position: "absolute",
          width: "90%",
          margin: "auto",
          borderRadius: 30,
          left: "5%",
          right: "5%",
          paddingBottom: -1,
          zIndex: 2,
          //   paddingTop: Platform.OS === "ios"? 14 : 0,

          flexDirection: "row",
          height: 50,
          bottom: Platform.OS == "ios" ? 30 : 10,
          backgroundColor: "black",
          shadowColor: "#000",
          shadowOffset: { width: 2, height: 10 },
          shadowOpacity: 0.25,
          shadowRadius: 5,
          elevation: 5,
        },
      }}
    >
      <Tabs.Screen
        name="main"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              className={
                (focused && "bg-red-500") +
                " p-2 h-full w-full justify-center items-center rounded-full z-50"
              }
            >
              <AntDesign name="home" color={"white"} size={20} />
            </View>
          ),
          tabBarShowLabel: false,
          
        }}
      />
      <Tabs.Screen
        name="favourites"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              className={
                (focused && "bg-red-500") +
                " p-2 h-full w-full justify-center items-center rounded-full z-50"
              }
            >
              <AntDesign name="hearto" color={"white"} size={20} />
            </View>
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              className={
                (focused && "bg-red-500") +
                " p-2 h-full w-full justify-center items-center rounded-full z-50"
              }
            >
              <AntDesign name="user" color={"white"} size={20} />
            </View>
          ),
          tabBarShowLabel: false,
        }}
      />
    </Tabs>
  );
};

export default _layout;
