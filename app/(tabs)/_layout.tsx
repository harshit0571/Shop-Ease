import { View, Text, Platform } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          width: "90%",
          margin: "auto",
          borderRadius: 50,
          
          paddingBottom:-1,
          zIndex:2,
          //   paddingTop: Platform.OS === "ios"? 14 : 0,
          flexDirection:"row",
          height: 60,
          bottom: 30,
          backgroundColor: "black",
        },
      }}
    >
 
      <Tabs.Screen
        name="main"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              className={
                (focused && "bg-red-400") +
                " p-2 h-full w-full justify-center items-center rounded-full z-50"
              }
            >
              <AntDesign name="home" color={"white"} size={40} />
            </View>
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="favourites"
        options={{
          tabBarIcon: ({focused}) => (
            <View
              className={
                (focused && "bg-red-400") +
                " p-2 h-full w-full justify-center items-center rounded-full z-50"
              }
            >
              <AntDesign name="hearto" color={"white"} size={40} />
            </View>
          ),
          tabBarShowLabel: false,
          
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              className={
                (focused && "bg-red-400") +
                " p-2 h-full w-full justify-center items-center rounded-full z-50"
              }
            >
              <AntDesign name="user" color={"white"} size={40} />
            </View>
          ),
          tabBarShowLabel: false,
        }}
      />
    </Tabs>
  );
};

export default _layout;
