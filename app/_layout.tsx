import * as SecureStore from "expo-secure-store";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { Redirect, Slot, Stack } from "expo-router";
import CategoriesProvider from "@/context/CategoriesProvider";
import { ReduxProvider } from "@/redux/StoreProvider";
import CommonHeader from "@/components/common/CommonHeader";
import Header from "@/components/Home/Header";

const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

function RootLayoutNav() {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <ReduxProvider>
          <CategoriesProvider>
            <Stack screenOptions={{ headerShown: true }}>
              <Stack.Screen
                name="(tabs)"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="(products)"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="(cart)" options={{ headerShown: false }} />
              <Stack.Screen name="(search)" options={{ headerShown: false }} />
              <Stack.Screen
                name="(auth)/sign-up"
                options={{ headerShown: false }}
              />
            </Stack>
          </CategoriesProvider>
        </ReduxProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}

export default RootLayoutNav;
