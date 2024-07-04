import { View, Text, SafeAreaView, Pressable } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import {
  SignedIn,
  SignIn,
  SignOutButton,
  useClerk,
  useUser,
} from "@clerk/clerk-react";

const index = () => {
  const router = useRouter();
  const { signOut } = useClerk();

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
