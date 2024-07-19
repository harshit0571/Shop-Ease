import { View, Text, Pressable } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth, useClerk } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

const profile = () => {
  const { signOut } = useClerk();
  const { isSignedIn } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!isSignedIn) {
      router.push("/sign-up");
    }
  }, [isSignedIn]);
  return (
    <SafeAreaView>
      <Pressable
        onPress={() => {
          signOut();
        }}
      >
        <Text>Signout</Text>
      </Pressable>
      <Text>profile</Text>
    </SafeAreaView>
  );
};

export default profile;
