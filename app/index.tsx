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
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Redirect href={"/sign-up"} />;
  }

  return <Redirect href={"/main"} />;
};

export default index;
