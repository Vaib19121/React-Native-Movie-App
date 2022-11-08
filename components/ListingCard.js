import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { truncate } from "../utils/index";
import { useNavigation } from "@react-navigation/native";

const ListingCard = ({ movie }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("MovieDeatil", { id: movie.id })}
      activeOpacity={0.9}
      className="mx-3 my-1 flex-row p-2 flex-1"
    >
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }}
        className="w-28 h-28 rounded-lg bg-slate-900 object-cover"
      />
      <View className="flex-1 ml-2">
        <Text className="text-white font-bold text-base">
          {truncate(movie?.title, 40)}
        </Text>
        <Text className="text-gray-400 text-sm">
          {truncate(movie?.overview, 85)}
        </Text>
        <View className="flex-row items-center justify-between mt-1">
          <Text className="text-green-400 text-sm">
            {movie?.release_date?.split("-")[0]}
          </Text>
          <Text className="text-amber-400 text-sm">
            {movie?.vote_average} / 10
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListingCard;
