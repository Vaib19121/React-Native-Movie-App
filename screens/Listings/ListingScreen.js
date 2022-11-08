import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { AppStatusbar, ListingCard } from "../../components";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ListingScreen = ({ route }) => {
  const navigation = useNavigation();
  const { data, category } = route.params;
  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="px-4 py-3 bg-black flex-row items-center justify-between">
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={25} color="#fff" />
        </TouchableOpacity>
        <Text className="capitalize text-xl text-white">{category}</Text>
        <View />
      </View>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View className="py-1">
            <ListingCard movie={item} />
          </View>
        )}
      />
      <AppStatusbar
        style={"light"}
        translucent={false}
        backgroundColor={"#000"}
      />
    </SafeAreaView>
  );
};

export default ListingScreen;
