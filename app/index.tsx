import { View, Text, SafeAreaView, Pressable } from "react-native";
import React, { useEffect } from "react";
import { Redirect, useRouter } from "expo-router";
import {
  SignedIn,
  SignIn,
  SignOutButton,
  useClerk,
  useUser,
  useAuth,
} from "@clerk/clerk-react";

const index = () => {
  const router = useRouter();
  const { signOut } = useClerk();
  const { isSignedIn, isLoaded, userId } = useAuth();
  console.log(isSignedIn);

  useEffect(() => {
    console.log(isLoaded, isSignedIn, userId);
    const checkUser = () => {
      if (isLoaded && !isSignedIn) {
        console.log(isSignedIn, "done");
      }
      console.log(isSignedIn, "done");
    };
    checkUser();
  }, [isSignedIn, isLoaded]);

  return (
    <SafeAreaView>
      <Text>index</Text>
      <Pressable
        onPress={() => {
          router.push("/sign-up");
        }}
      >
        <Text>sign in</Text>
      </Pressable>
      <SignedIn>
        <Pressable
          onPress={() => {
            signOut();
          }}
        >
          <Text>sign out</Text>
        </Pressable>
      </SignedIn>
    </SafeAreaView>
  );
};

export default index;
