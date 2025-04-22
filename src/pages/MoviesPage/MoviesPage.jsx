import MovieList from "../../components/MovieList/MovieList";
import { fetchMovieByQuery } from "../../services/api";
import s from "./MoviesPage.module.css";

import { useState } from "react";
import Loader from "../../components/Loader/Loader";
import toast from "react-hot-toast";

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      toast.error("Поле не може бути порожнім!");
      return;
    }
    setIsLoading(true);
    setError(false);
    setMovies([]);

    try {
      const results = await fetchMovieByQuery(trimmedQuery);
      setMovies(results);
      if (results.length === 0) {
        setError(true);
        toast.error("Фільми не знайдено!");
      }
    } catch (error) {
      console.log(error);

      setError(true);
      toast.error("Помилка при пошуку.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className={s.input}
          type="text"
          name="query"
          onChange={handleChange}
          placeholder="Search for movies..."
        />
        <button className={s.button} type="submit">
          Search
        </button>
      </form>
      {isLoading && <Loader />}
      {!isLoading && movies.length > 0 && <MovieList movies={movies} />}
      {!isLoading && error && <p className={s.empty}>No results...</p>}
    </div>
  );
};

export default MoviesPage;
