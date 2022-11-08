import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const FeaturedRow = ({ lable, onPress, render }) => {
  return (
    <View className="mt-2">
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.6}
        className="mx-4 flex-row justify-between items-center"
      >
        <Text className="capitalize text-base text-white font-bold py-2">
          {lable}
        </Text>
        <Text className="text-green-500">See All</Text>
      </TouchableOpacity>
      {render}
    </View>
  );
};

export default FeaturedRow;
