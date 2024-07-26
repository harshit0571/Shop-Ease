import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AntDesign from "@expo/vector-icons/AntDesign";
import { fetchCartItems, removeFromCart } from "@/redux/cart/cartSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useAuth } from "@clerk/clerk-expo";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  const { userId } = useAuth();

  useEffect(() => {
    if (userId) {
      dispatch(fetchCartItems(userId.toString()));
    }
  }, [dispatch, userId]);

  const [cartData, setCartData] = useState<any>(null);

  useEffect(() => {
    const getProducts = async () => {
      const list = await Promise.all(
        cartItems.map(async (item) => {
          const docRef = await getDoc(doc(db, "Products", item.pID));
          return {
            ...docRef.data(),
            id: item.id, // cart item ID
            size: item.size, // cart item size
            quantity: item.quantity, // cart item quantity
          };
        })
      );
      setCartData(list);
    };

    getProducts();
  }, [cartItems]);

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const renderItem = ({ item }: { item: any }) => (
    <View className="flex flex-row justify-between items-center gap-1 border-b border-gray-200 p-4">
      <View>
        <Image
          source={{ uri: item.images[0] }}
          className="min-w-[100px]  min-h-[100px] "
        />
      </View>
      <View className="flex-1">
        <Text className="text-xl font-bold">{item.name}</Text>
        <Text className="text-lg text-gray-500">Size: {item.size}</Text>
        <Text className="text-lg">Quantity: {item.quantity}</Text>
        <Text className="text-lg text-red-500 font-semibold">
          ${item.price}
        </Text>
      </View>
      <TouchableOpacity onPress={() => handleRemoveFromCart(item.id)}>
        <AntDesign name="delete" size={30} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      {cartData ? (
        <FlatList
          data={cartData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <Text className="text-center mt-10">Your cart is empty.</Text>
          }
        />
      ) : (
        <View className="mt-10">
                  <ActivityIndicator size={"large"} color={"red"} />

          </View>
      )}
    </View>
  );
};

export default Cart;
