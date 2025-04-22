import React, { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const trendingMovies = await fetchTrendingMovies();
        setMovies(trendingMovies);
      } catch (error) {
        console.log(error);
      }
    };

    loadMovies();
  }, []);
  return (
    <section>
      <h2>🔥 Trending today 🔥</h2>
      <MovieList movies={movies} />
    </section>
  );
};

export default HomePage;
