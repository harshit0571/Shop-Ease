import { View, Text, FlatList, Image } from "react-native";
import React from "react";

const BrandsScroll = () => {
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
  return (
    <View>
      <FlatList
        style={{ width: "90%", margin: "auto" }}
        data={brands}
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={({ item }) => (
          <View className="mx-3 outline-3  flex-col justify-center items-center outline-red-300">
            <Image
              source={{ uri: item.ImgUrl }}
              className="w-max h-max min-w-[70px] min-h-[70px] rounded-full mb-1 font-bold"
            />

            <Text className="font-semibold">{item.label}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default BrandsScroll;
