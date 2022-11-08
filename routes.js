export const baseUrl = "https://api.themoviedb.org/3";
export const imageUrl = "https://image.tmdb.org/t/p/original";
export const API_KEY = "444b228642bfdb06a1d2c31568941741";
export const route = {
  now_playing: `${baseUrl}/movie/now_playing?api_key=${API_KEY}`,
  popular: `${baseUrl}/movie/popular?api_key=${API_KEY}`,
  top_rated: `${baseUrl}/movie/top_rated?api_key=${API_KEY}`,
  upcoming: `${baseUrl}/movie/upcoming?api_key=${API_KEY}`,
  trending: `${baseUrl}/trending/movie/week?api_key=${API_KEY}`,
  search: `${baseUrl}/search/movie?api_key=${API_KEY}`
};
