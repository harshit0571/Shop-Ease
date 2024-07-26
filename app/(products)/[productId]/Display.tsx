import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { Image } from "expo-image";
import Carousel from "react-native-reanimated-carousel";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/cart/cartSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useAuth } from "@clerk/clerk-expo";

const Index = () => {
  const { productId } = useLocalSearchParams();
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<any>(null);
  const width = Dimensions.get("window").width;
  const dispatch = useDispatch<AppDispatch>();
  const { userId } = useAuth();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  useEffect(() => {
    const getProduct = async () => {
      const docRef = doc(db, "Products", productId?.toString() || "");
      const snapShot = await getDoc(docRef);
      setProduct(snapShot.data());
    };

    getProduct();
  }, [productId]);

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const renderDescription = () => {
    const maxLength = 200;
    if (
      isDescriptionExpanded ||
      !product?.description ||
      product?.description.length <= maxLength
    ) {
      return product?.description;
    } else {
      return `${product?.description.substring(0, maxLength)}...`;
    }
  };

  const getRatingColor = () => {
    const rating = product?.rating || 0;
    const color = [
      "bg-red-500",
      "bg-orange-500",
      "bg-orange-400",
      "bg-yellow-300",
      "bg-green-300",
      "bg-green-500",
    ];
    if (rating === 0) {
      return "bg-gray-400";
    }
    return color[Math.round(rating)];
  };

  const isAlreadyInCart = (size: string | null) => {
    return cartItems.some(
      (item) => item.pID === productId && item.size === size
    );
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }

    const cartItem = {
      productId: productId?.toString() || "",
      userId: userId?.toString() || "",
      quantity,
      size: selectedSize,
    };

    dispatch(addToCart(cartItem));
  };

  return (
    <>
      {product ? (
        <ScrollView className="flex-1 bg-white w-full">
          <View className="w-full flex-1 relative flex justify-center items-center">
            <Carousel
              loop
              width={width}
              height={350}
              autoPlay={false}
              data={product?.images}
              scrollAnimationDuration={3000}
              mode="parallax"
              pagingEnabled={true}
              defaultIndex={selectedImage}
              onSnapToItem={(index) => setSelectedImage(index)}
              renderItem={({
                item,
                index,
              }: {
                item: string;
                index: number;
              }) => (
                <View
                  key={index}
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    justifyContent: "center",
                  }}
                >
                  <Image
                    contentFit="cover"
                    source={{ uri: item }}
                    className="w-full flex-1 h-[450px]"
                  />
                </View>
              )}
            />
            <View className="h-max m-auto flex flex-row gap-3 p-3">
              {product?.images.map((image: string, index: number) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedImage(index)}
                >
                  <Image
                    contentFit="cover"
                    source={{ uri: image }}
                    className="w-[60px] h-[60px] border-solid border-black border-2 rounded-xl shadow-lg shadow-black"
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View className="px-2 flex flex-col gap-2 border-t-2 border-gray-300 mt-1">
            <View className="flex justify-between flex-row items-center">
              <View>
                {product?.subcategories.map((sub: string) => (
                  <Text className="text-lg text-gray-600" key={sub}>
                    {sub}
                  </Text>
                ))}
              </View>

              <View
                className={
                  getRatingColor() +
                  " p-1 px-3 justify-center rounded-full flex flex-row items-center "
                }
              >
                <AntDesign size={20} name="star" color={"white"} />
                <Text className="text-lg ml-2 text-white font-bold">
                  {product?.ratings}
                </Text>
              </View>
            </View>
            <Text className="text-3xl font-bold text-gray-800">
              {product?.name}
            </Text>
            <Text className="text-2xl text-red-500 font-semibold">
              ${product?.price}
            </Text>
            <Text className="text-xl font-bold mt-5">Product Details</Text>
            <Text className="text-lg">{renderDescription()}</Text>
            {product?.description && product?.description.length > 200 && (
              <TouchableOpacity onPress={toggleDescription}>
                <Text className="text-gray-500 underline">
                  {isDescriptionExpanded ? "Read Less" : "Read More"}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <View className="pt-4 border-t-2 border-s border-gray-300 w-[95%] m-auto mt-5 pb-5">
            <Text className="text-xl mb-2 font-bold">Select Size</Text>

            <ScrollView
              horizontal
              className="flex px-1 mt-4 flex-row gap-3 overflow-auto"
            >
              {product?.sizes.map((size: string) => (
                <TouchableOpacity
                  key={size}
                  className={`p-3 ${
                    selectedSize === size ? "bg-red-500" : "bg-gray-200"
                  } min-w-[50px] min-h-[50px] flex justify-center items-center`}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text className={selectedSize === size ? "text-white" : ""}>
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View className="flex flex-row justify-between px-3 my-5 gap-10 items-baseline">
            {!isAlreadyInCart(selectedSize) ? (
              <>
                <View className="flex flex-row items-center gap-3">
                  <TouchableOpacity
                    onPress={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  >
                    <AntDesign name="minussquareo" size={35} />
                  </TouchableOpacity>
                  <Text className="text-xl font-bold">{quantity}</Text>
                  <TouchableOpacity
                    onPress={() => setQuantity((prev) => prev + 1)}
                  >
                    <AntDesign name="plussquareo" size={35} />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  className="py-2 px-3 rounded-full flex-1 bg-red-500"
                  onPress={handleAddToCart}
                >
                  <Text className="text-xl text-white text-center">
                    Add to cart
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity className="py-2 px-3 rounded-full flex-1 bg-gray-500">
                <Text className="text-xl text-white text-center">
                  Already in Cart
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <View className="p-5 bg-red-500 fixed bottom-0"></View>
        </ScrollView>
      ) : (
        <View className="w-full flex justify-center items-center mt-10">
          <ActivityIndicator size={"large"} color={"red"} />
        </View>
      )}
    </>
  );
};

export default Index;
