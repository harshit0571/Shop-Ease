import { View, Text, Image, ActivityIndicator, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";

const OrderDetails = () => {
  const { orderId } = useLocalSearchParams();
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const { userId } = useAuth();

  useEffect(() => {
    const getOrder = async () => {
      if (!orderId) {
        setError("Order ID is missing");
        return;
      }

      try {
        const orderDoc = doc(db, "orders", orderId.toString());
        const orderSnapshot = await getDoc(orderDoc);

        if (orderSnapshot.exists()) {
          const orderData = orderSnapshot.data();

          const products = await Promise.all(
            orderData.orderDetails.map(async (item: any) => {
              try {
                const productDoc = doc(db, "Products", item.pID);
                const productSnapshot = await getDoc(productDoc);
                if (productSnapshot.exists()) {
                  return productSnapshot.data();
                } else {
                  console.warn(`Product with pid ${item.pID} not found`);
                  return null;
                }
              } catch (error) {
                console.error(
                  `Failed to fetch product with pid ${item.pID}:`,
                  error
                );
                return null;
              }
            })
          );

          const filteredProducts = products.filter(
            (product) => product !== null
          );

          setOrder({
            ...orderData,
            products: filteredProducts,
          });
        } else {
          setError("Order not found");
        }
      } catch (error) {
        console.error("Failed to fetch order:", error);
        setError("Failed to fetch order. Please try again later.");
      }
    };

    getOrder();
  }, [orderId]);

  if (error) {
    return (
      <View className="flex-1 justify-center items-center p-4 bg-gray-100">
        <Text className="text-red-500 text-lg font-semibold">{error}</Text>
      </View>
    );
  }

  if (!order) {
    return (
      <View className="flex-1 justify-center items-center p-4 bg-gray-100">
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <ScrollView className="p-4 bg-gray-100">
      <View className="mb-6 p-4 bg-white rounded-lg shadow-md">
        <Text className="text-xl font-bold mb-2">Order Summary</Text>
        <Text className="text-lg font-medium mb-1">Order ID: {orderId}</Text>
        <Text className="text-lg font-medium mb-1">Total Price: ${order?.totalPrice?.toFixed(2)}</Text>
        <Text className="text-lg font-medium mb-1">Discounted Price: ${order?.discountedPrice?.toFixed(2)}</Text>
        <Text className="text-lg font-medium mb-1">Date Ordered: {new Date(order?.date).toLocaleDateString()}</Text>
      </View>

      <View className="border-t border-gray-300 my-4" />

      <Text className="text-xl font-bold mb-4">Product Details</Text>
      {order.products.map((product: any, index: number) => (
        <View
          key={index}
          className="bg-white rounded-lg shadow-md mb-4 p-4 border border-gray-200"
        >
          <View className="flex-row items-center">
            <Image
              source={{ uri: product.images[0] }}
              className="w-24 h-24 rounded-lg border border-gray-300"
            />
            <View className="ml-4 flex-1">
              <Text className="text-lg font-semibold mb-1">{product.name}</Text>
              <Text className="text-md mb-1">Size: {order.orderDetails[index]?.size}</Text>
              <Text className="text-md mb-1">Quantity: {order.orderDetails[index]?.quantity}</Text>
              <Text className="text-md text-red-500">Price: ${product.price.toFixed(2)}</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default OrderDetails;
