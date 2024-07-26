import React, { useCallback, useMemo, useRef } from "react";
import { View, Text, Button, FlatList, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

const Cart = () => {
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  // sample cart items
  const cartItems = [
    { id: "1", name: "Product 1", price: 29.99 },
    { id: "2", name: "Product 2", price: 49.99 },
    { id: "3", name: "Product 3", price: 19.99 },
  ];

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  // renders
  return (
    <GestureHandlerRootView className="flex-1">
      <BottomSheetModalProvider>
        <View className="flex-1 bg-white">
          <View className="absolute bottom-0 left-0 flex items-center right-0 p-4 h-[100px] bg-white">

            <TouchableOpacity
              className="bg-red-500 py-2 px-6 rounded-full"
              onPress={handlePresentModalPress}
            >
              <Text className="text-white text-2xl">Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
          >
            <BottomSheetView className="flex-1 items-center justify-center">
              <Text>Checkout Details 🎉</Text>
            </BottomSheetView>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default Cart;
