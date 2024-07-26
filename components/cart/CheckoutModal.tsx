import React, { useCallback, useMemo, useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

const Cart = () => {
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "100%"], []);

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
            <BottomSheetView>
              <View className="flex items-center flex-col gap-5 p-4 pb-10">
                <View className="w-full flex flex-row px-7">
                  <TextInput
                    placeholder="Promo Code"
                    className="bg-gray-100 py-3 px-6 flex-1 rounded-l-xl"
                  />
                  <TouchableOpacity className="bg-red-500 py-2 px-2 w-max rounded-r-lg">
                    <Text className="text-white text-lg">Apply coupon</Text>
                  </TouchableOpacity>
                </View>
                <View className="flex flex-col w-full px-7">
                  <View className="flex w-full flex-row justify-between">
                    <Text className="text-lg text-gray-500">Subtotal</Text>
                    <Text className="text-lg text-gray-500">$99.99</Text>
                  </View>

                  <View className="flex w-full flex-row justify-between">
                    <Text className="text-lg text-gray-500">Discount</Text>
                    <Text className="text-lg text-gray-500">-$10.00</Text>
                  </View>

                  <View className="flex w-full flex-row justify-between">
                    <Text className="text-lg text-gray-500">Total</Text>
                    <Text className="text-lg text-gray-500">$89.99</Text>
                  </View>
                </View>
                <TouchableOpacity
                  className="bg-red-500 py-2 px-6 mb-6 w-max rounded-full"
                  onPress={handlePresentModalPress}
                >
                  <Text className="text-white text-xl text-center">
                    Proceed to Checkout
                  </Text>
                </TouchableOpacity>
              </View>
            </BottomSheetView>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default Cart;
