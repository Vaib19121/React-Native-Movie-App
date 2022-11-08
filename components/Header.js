import {
  View,
  Text,
  Image,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import AppStatusbar from "./Statusbar";
import { LinearGradient } from "expo-linear-gradient";
import useAuth from "../hooks/useAuth";
import { truncate } from "../utils";

const Header = () => {
  const { nowPlaying } = useAuth();
  let random = Math.floor(Math.random() * nowPlaying.length);
  const [movie, setMovie] = React.useState(nowPlaying[random]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      random = Math.floor(Math.random() * nowPlaying.length);
      setMovie(nowPlaying[random]);
    }, 4000);
    return () => clearInterval(interval);
  }, [nowPlaying]);

  return (
    <>
      <ImageBackground
        source={{
          uri: `https://image.tmdb.org/t/p/original${movie?.poster_path}`,
        }}
        className="px-4 py-2 object-cover h-96"
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,1)"]}
          className="absolute inset-0"
        >
          <SafeAreaView className="w-full absolute bottom-3">
            <View className="mx-4">
              <Text className="text-white text-2xl font-bold">
                {truncate(movie?.title, 29)}
              </Text>
              <Text className="text-gray-100 text-sm font-bold mb-2">
                {truncate(movie?.overview, 79)}
              </Text>
              
            </View>
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
      <AppStatusbar
        translucent={true}
        style="light"
        backgroundColor={"transparent"}
      />
    </>
  );
};

export default Header;
