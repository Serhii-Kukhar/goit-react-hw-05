import MovieList from "../../components/MovieList/MovieList";
import { fetchMovieByQuery } from "../../services/api";
import s from "./MoviesPage.module.css";

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import toast from "react-hot-toast";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [inputValue, setInputValue] = useState(query);

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      setIsLoading(true);
      setError(false);
      setMovies([]);

      try {
        const results = await fetchMovieByQuery(query);
        setMovies(results);
        if (results.length === 0) {
          setError(true);
          toast.error("Фільми не знайдено!");
        }
      } catch (error) {
        setError(true);
        toast.error("Помилка при пошуку.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) {
      toast.error("Поле не може бути порожнім!");
      return;
    }
    setSearchParams({ query: trimmed });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className={s.input}
          type="text"
          name="query"
          value={inputValue}
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
