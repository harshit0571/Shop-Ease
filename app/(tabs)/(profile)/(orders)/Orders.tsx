import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { useAuth } from "@clerk/clerk-expo";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";

const Orders = () => {
  const [orderList, setOrderList] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const { userId } = useAuth();
  const router = useRouter();
  useEffect(() => {
    const getOrders = async () => {
      try {
        const ordersQuery = query(
          collection(db, "orders"),
          where("uid", "==", userId?.toString() || "")
        );
        const ordersSnapshot = await getDocs(ordersQuery);

        const orders = await Promise.all(
          ordersSnapshot.docs.map(async (docs) => {
            const orderData = docs.data();

            const products = await Promise.all(
              orderData.orderDetails.map(async (item: any) => {
                try {
                  const productDoc = await getDoc(
                    doc(db, "Products", item.pID)
                  );
                  if (productDoc.exists()) {
                    return productDoc.data();
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

            return {
              oID: docs.id,
              ...orderData,
              products: filteredProducts,
            };
          })
        );

        setOrderList(orders);
        console.log(orders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setError("Failed to fetch orders. Please try again later.");
      }
    };

    getOrders();
  }, [userId]);

  const renderItem = ({ item }: { item: any }) => {
    const primaryProduct = item.products[0];
    const additionalItemsCount = item.products.length - 1;

    return (
      <TouchableOpacity
        className="flex flex-row justify-between items-center gap-1 border-b border-gray-200 p-4"
        onPress={() => router.push("(orders)/" + item.oID + "/")}
      >
        <View className="mr-2">
          <Image
            source={{ uri: primaryProduct?.images[0] }}
            className="min-w-[100px] min-h-[100px]"
          />
        </View>
        <View className="flex-1">
          <Text className="text-xl font-bold">{primaryProduct?.name}</Text>
          <Text className="text-lg text-gray-500">
            Size: {item.orderDetails[0]?.size}
          </Text>
          <Text className="text-lg">
            Quantity: {item.orderDetails[0]?.quantity}
          </Text>
          <Text className="text-lg text-red-500 font-semibold">
            ${item.discountedPrice}
          </Text>
          {additionalItemsCount > 0 && (
            <Text className="text-gray-600 text-lg">
              +{additionalItemsCount} more item
              {additionalItemsCount > 1 ? "s" : ""}
            </Text>
          )}
        </View>
        {/* Uncomment and implement if needed */}
        {/* <TouchableOpacity onPress={() => handleRemoveFromCart(item.id)}>
          <AntDesign name="delete" size={30} color="red" />
        </TouchableOpacity> */}
      </TouchableOpacity>
    );
  };

  return (
    <View>
      {error ? (
        <Text className="text-red-500">{error}</Text>
      ) : orderList ? (
        <FlatList
          data={orderList}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()} // Use item id if available
        />
      ) : (
        <View>
          <ActivityIndicator size={"large"} color={"red"} />
        </View>
      )}
    </View>
  );
};

export default Orders;
