import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  FlatList,
  ActivityIndicator,
  StatusBar,

} from "react-native";
import React, { useEffect, useState } from "react";
import { AppStatusbar } from "../../components";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { truncate } from "../../utils";
import { API_KEY } from "../../routes"
import { useNavigation } from "@react-navigation/native";

const baseUrl = "https://api.themoviedb.org/3/movie";

const MovieDeatil = ({ route }) => {
  const [showMore, setShowMore] = useState(false);
  const [movie, setMovie] = useState([]);
  const ratings = [{}, {}, {}, {}, {}, {}];
  const [loading, setLoading] = useState(true);
  let movieId = route.params.id;
  let [genres, setGenres] = useState([]);
  let [languages, setLanguages] = useState([]);

  const fetchDetail = async () => {
    try {
      const response = await fetch(`${baseUrl}/${movieId}?api_key=${API_KEY}`);
      const result = await response.json();
      setMovie(result);
      setGenres(result.genres);
      setLanguages(result.spoken_languages);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchDetail();
    return () => {
      setMovie([]);
    };
  }, []);

  if (loading) {
    return (
      <SafeAreaView className="h-full bg-black items-center justify-center">
        <View>
          <ActivityIndicator size={"large"} color="#fff" />
          <Text className="text-gray-300 capitalize text-center text-base">
            Fetching data
          </Text>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <View className="h-full bg-black">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <Banner poster_path={movie?.poster_path} />

        <View className="items-center justify-center -mt-10">
          <Text className="text-white text-2xl font-bold tracking-wider capitalize w-64 text-center">
            {movie?.title}
          </Text>
          <View className="mx-6 flex-row items-center gap-3 my-1">
            <Text className="text-gray-300 capitalize text-sm">
              {movie?.release_date}
            </Text>
            {genres.map((genre) => (
              <View key={genre.id} className="flex-row items-center">
                <Text className="text-gray-300 capitalize text-xs mr-2">•</Text>
                <Text className="text-gray-300 capitalize text-sm">
                  {genre.name}
                </Text>
              </View>
            ))}
          </View>
          <View className="mx-6 flex-row items-center gap-3">
            {ratings.map((_, index) => (
              <Ionicons key={index} name="star" size={15} color={"#fd9f12"} />
            ))}
          </View>
        </View>

        <View className="mx-4 mt-6">
          <Text className="text-white capitalize tracking-wide text-base">
            Story line
          </Text>
          <Text className="text-gray-300 capitalize text-sm mt-2">
            {showMore ? movie?.overview : truncate(movie?.overview, 205)}
          </Text>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setShowMore(!showMore)}
          >
            <Text className="text-green-500 text-sm capitalize">
              {showMore ? "show less" : "show more"}
            </Text>
          </TouchableOpacity>
        </View>

        <View className="mt-6 mx-4">
          <Text className="text-white capitalize tracking-wide text-base mb-2">
            spoken languages
          </Text>
          <View>
            {languages.map((language) => (
              <Text
                key={language.english_name}
                className="text-gray-300 capitalize text-sm mb-1"
              >
                {language.english_name}
              </Text>
            ))}
          </View>
        </View>

        <View className="mt-6 mb-5">
          <Text className="mx-4 text-white capitalize tracking-wide text-base mb-2">
            production companies
          </Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={movie.production_companies}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item?.logo_path}`,
                }}
                className="h-28 w-24 rounded-lg object-contain bg-slate-50 mx-2"
              />
            )}
          />
        </View>
      </ScrollView>
      <AppStatusbar style={"light"} />
    </View>
  );
};

const Banner = ({ poster_path }) => {
  return (
    <ImageBackground
      source={{
        uri: `https://image.tmdb.org/t/p/w500${poster_path}`,
      }}
      className="h-80 relative object-cover"
    >
      <LinearGradient
        colors={["rgba(0,0,0,0.2)", "rgba(0,0,1,3)"]}
        className="absolute inset-0"
      >
        <Header />
      </LinearGradient>
    </ImageBackground>
  );
};

const Header = () => {
  const navigation = useNavigation();
  return (
    <View className="mx-4" style={{ paddingTop: StatusBar.currentHeight }}>
      <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default MovieDeatil;
