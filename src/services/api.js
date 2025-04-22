import axios from "axios";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWRmZjBkNGM1NGI4MjI4MjgwZjcxY2FiMGQxZjA3YyIsIm5iZiI6MTc0NDc4MzczNy4zMzIsInN1YiI6IjY3ZmY0OTc5NDM3ZjBiODBlZWFkNjUwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YyJZpl9e9UHjNLUBih5UKJRD7cf9tfFvAKFvvahKkZ4";
const BASE_URL = "https://api.themoviedb.org/3";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    "Content-Type": "application/json;charset=utf-8",
  },
});

export const fetchTrendingMovies = async () => {
  try {
    const response = await api.get("/trending/movie/day");
    return response.data.results;
  } catch (error) {
    console.log(error);

    return [];
  }
};

export const fetchMovieById = async (movieId) => {
  const response = await api.get(`/movie/${movieId}`);
  return response.data;
};

export const fetchMovieCast = async (movieId) => {
  const response = await api.get(`/movie/${movieId}/credits`);
  return response.data.cast;
};

export const fetchMovieReviews = async (movieId) => {
  const response = await api.get(`/movie/${movieId}/reviews`);
  return response.data.results;
};

export const fetchMovieByQuery = async (query) => {
  if (!query) return null;
  const response = await api.get(`/search/movie?query=${query}`);
  return response.data.results;
};
