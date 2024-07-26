import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth, useClerk } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome"; // Import additional icons if needed

const Profile = () => {
  const { signOut } = useClerk();
  const { isSignedIn, userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/sign-up");
    }
  }, [isSignedIn]);

  interface UserInterface {
    email: string;
    name: string;
    uid: string;
  }

  const [userData, setUserData] = useState<UserInterface | null>(null);

  useEffect(() => {
    const getUser = async () => {
      if (userId) {
        const docRef = await getDoc(doc(db, "users", userId));
        if (docRef.exists()) {
          setUserData(docRef.data() as UserInterface);
        } else {
          console.log("No such document!");
        }
      }
    };
    getUser();
  }, [userId]);

  const bar = [
    {
      id: "1",
      name: "Profile",
      link: "/Profile",
      icon: "user",
    },
    {
      id: "2",
      name: "Orders",
      link: "(orders)/Orders",
      icon: "shoppingcart",
    },
    {
      id: "3",
      name: "Saved Addresses",
      link: "/Addresses",
      icon: "home",
    },
  ];

  const RenderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() => router.push(item.link)}
      className="flex-row items-center w-full h-max shadow-lg border-b-2 border-gray-100 p-4 mb-4 rounded"
    >
      <AntDesign name={item.icon} color={"red"} size={30} />
      <View className="flex-1 ml-3">
        <Text className="text-lg text-gray-700">{item?.name}</Text>
      </View>
      <AntDesign name="right" color={"red"} size={30} />
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white">
      {userData ? (
        <View className="flex-1 p-4">
          <View className="flex-col justify-center items-center mb-5">
            <TouchableOpacity className="bg-red-500 py-7 px-10 rounded-full">
              <Text className="text-white text-3xl font-bold">H</Text>
            </TouchableOpacity>
            <Text className="text-lg font-bold mt-2">{userData?.name}</Text>
          </View>
          <View className="w-full">
            {bar.map((item) => (
              <RenderItem key={item.id} item={item} />
            ))}
          </View>
          <TouchableOpacity
            onPress={() => {
              signOut();
            }}
            className="mt-4 flex-row items-center justify-center"
          >
            <AntDesign name="logout" color={"red"} size={30} />
            <Text className="text-red-500 ml-2">Sign out</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size={"large"} color={"red"} />
        </View>
      )}
    </View>
  );
};

export default Profile;
