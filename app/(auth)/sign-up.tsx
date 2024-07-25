import React, { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import { setDoc, doc, collection, getDoc } from "firebase/firestore";

import {
  Text,
  View,
  Button,
  SafeAreaView,
  Pressable,
  Image,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";

import { useAuth, useOAuth, useUser } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { Redirect, router, useRouter } from "expo-router";
import { db } from "@/firebaseConfig";

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

const SignInWithOAuth = () => {
  useWarmUpBrowser();
  const router = useRouter();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const { isSignedIn } = useAuth();
  const { userId } = useAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const saveUser = async () => {
      if (userId) {
        console.log(userId, "uid");
        const userDocRef = doc(db, "users", userId || "temp");

        const userDocSnapshot = await getDoc(userDocRef);
        if (!userDocSnapshot.exists()) {
          // Document does not exist, create it
          await setDoc(userDocRef, {
            name: name,
            email: email,
            uid: userId || "temp",
          });
          console.log("User created successfully");
        }
        router.push("/");
      }
    };
    saveUser();
  }, [userId, name, email]);
  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({
          redirectUrl: Linking.createURL("/", { scheme: "myapp" }),
        });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
      if (signUp) {
        setEmail(signUp?.emailAddress || "");
        setName(signUp?.firstName || "");
        console.log(signUp?.emailAddress);
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <SafeAreaView className="bg-red-400 flex-1 justify-center gap-10 items-center">
      <View className="flex flex-col justify-center items-center gap-5 pb-10">
        <Entypo name="shopping-cart" size={100} color="white" />
        <Text className="text-3xl font-bold text-white">ShopEase</Text>
      </View>
      <Pressable
        className="py-2 px-3 bg-white rounded-md flex-row items-center justify-center border-2 border-black"
        onPress={onPress}
      >
        <AntDesign name="google" size={24} color="red" />
        <Text className="text-lg px-2 font-semibold">Sign in with Google</Text>
      </Pressable>
    </SafeAreaView>
  );
};
export default SignInWithOAuth;
