import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const SearchPage = () => {
  const { searchText } = useLocalSearchParams();

  return (
    <View>
      <Text>SearchPage {searchText}</Text>
    </View>
  );
};

export default SearchPage;
