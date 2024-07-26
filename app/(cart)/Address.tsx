import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Button,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {
  addDoc,
  collection,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { useAuth } from "@clerk/clerk-expo";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setOrderData } from "@/redux/cart/cartSlice";

const AddressPage = () => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addresses, setAddresses] = useState<any>(null);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddressName, setNewAddressName] = useState("");
  const [newAddressLocation, setNewAddressLocation] = useState("");
  const { userId } = useAuth();
  const addAddress = async () => {
    if (newAddressName && newAddressLocation) {
      const newAddress = {
        uid: userId,
        name: newAddressName,
        location: newAddressLocation,
      };
      const docRef = await addDoc(collection(db, "address"), newAddress);
      const newAddressWithId = { ...newAddress, id: docRef.id };

      setAddresses([...addresses, newAddressWithId]);

      setNewAddressName("");
      setNewAddressLocation("");
      setIsAddingAddress(false);
    }
  };

  useEffect(() => {
    const getAddresses = async () => {
      const q = query(
        collection(db, "address"),
        where("uid", "==", userId?.toString() || "")
      );
      const docRef = await getDocs(q);
      const array = docRef.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAddresses(array);
      console.log(array);
    };
    getAddresses();
  }, []);

  const dispatch = useDispatch<AppDispatch>();
  const RenderItem = ({ item }: { item: any }) => (
    <View className="flex-1 flex flex-row items-center w-full h-max border-b-2 border-gray-200   p-4 mb-2 rounded">
      <View className="w-max b">
        <Entypo name="location-pin" size={40} color={"red"} />
      </View>
      <View className=" w-[80%] ">
        <Text className="text-lg font-bold">{item.name}</Text>
        <Text>{item.location}</Text>
      </View>
      <View></View>
      <BouncyCheckbox
        size={25}
        fillColor="red"
        unFillColor="#FFFFFF"
        iconStyle={{ borderColor: "red" }}
        innerIconStyle={{ borderWidth: 2 }}
        className="absolute right-0"
        isChecked={selectedAddress === item.id}
        textStyle={{ fontFamily: "JosefinSans-Regular" }}
        onPress={() => {
          setSelectedAddress(selectedAddress === item.id ? null : item.id);
        }}
      />
    </View>
  );

  const router=useRouter()
  return (
    <View className="flex-1 bg-white p-4 ">
      {isAddingAddress ? (
        <View className="mb-4">
          <TextInput
            placeholder="Address Name"
            value={newAddressName}
            onChangeText={setNewAddressName}
            className=" border-gray-300 mb-2 p-2 py-4 bg-gray-100"
          />
          <TextInput
            placeholder="Location"
            value={newAddressLocation}
            onChangeText={setNewAddressLocation}
            className=" border-gray-300 mb-2 p-2 py-4 bg-gray-100"
          />
          <TouchableOpacity
            onPress={() => addAddress()}
            className="mt-4 p-4 bg-white rounded flex flex-row items-center justify-center border-dotted border-red-500 border-2"
          >
            <AntDesign name="plus" size={24} color={"red"} />
            <Text className="text-red-500 text-lg ml-2">Add New Address</Text>
          </TouchableOpacity>
          <Button
            title="Cancel"
            onPress={() => setIsAddingAddress(false)}
            color="red"
          />
        </View>
      ) : addresses ? (
        <FlatList
          data={addresses}
          renderItem={({ item }) => <RenderItem item={item} />}
          keyExtractor={(item) => item.id}
          ListFooterComponent={() => (
            <TouchableOpacity
              onPress={() => setIsAddingAddress(true)}
              className="mt-4 p-4 bg-white rounded flex flex-row items-center justify-center border-dotted border-red-500 border-2"
            >
              <AntDesign name="plus" size={24} color={"red"} />
              <Text className="text-red-500 text-lg ml-2">Add New Address</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <ActivityIndicator size={"large"} color={"red"} />
      )}

      <View className="absolute bottom-0 left-0 flex items-center right-0 p-4 h-[100px] ">
        <TouchableOpacity
          className={
            " bg-red-500 py-2 px-6 rounded-full " +
            (selectedAddress === null && "bg-gray-400")
          }
          disabled={selectedAddress === null}
          onPress={() => {
            
            dispatch(
              setOrderData({
                addressId: selectedAddress || "",
              })
            );
            router.push("/Payment")
          }}
        >
          <Text className="text-white text-2xl">Proceed to Payment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddressPage;
