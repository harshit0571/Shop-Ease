import React from "react";
import { Stack } from "expo-router";
import CommonHeader from "@/components/common/CommonHeader";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="Orders"
        options={{ header: () => <CommonHeader title="Your Orders" /> }}
      />
      <Stack.Screen
        name="[orderId]/index"
        options={{ header: () => <CommonHeader title="Order Details" /> }}
      />
    </Stack>
  );
};

export default _layout;
