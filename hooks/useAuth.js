import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { route } from "../routes";
import axios from "axios";

const AuthContext = createContext({});

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [name, setName] = useState('');

  const getData = async () => {
    try {
      const nowPlaying = await axios.get(route.now_playing);
      const popular = await axios.get(route.popular);
      const topRated = await axios.get(route.top_rated);
      const upcoming = await axios.get(route.upcoming);
      const trending = await axios.get(route.trending);
      setNowPlaying(nowPlaying.data.results);
      setPopular(popular.data.results);
      setTopRated(topRated.data.results);
      setUpcoming(upcoming.data.results);
      setTrending(trending.data.results);
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getData();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    getData();
  }, []);

  const memoedValue = useMemo(
    () => ({
      loading,
      nowPlaying,
      popular,
      topRated,
      upcoming,
      trending,
      onRefresh,
      refreshing,
      isAuthenticated,
      setAuthenticated,
      name,
      setName
    }),
    [
      loading,
      nowPlaying,
      popular,
      topRated,
      upcoming,
      trending,
      onRefresh,
      refreshing,
      isAuthenticated,
      setAuthenticated,
      name,
      setName
    ]
  );
  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
