import { useEffect, useRef, useState } from "react";
import {
  Link,
  Outlet,
  useParams,
  useLocation,
  NavLink,
} from "react-router-dom";
import { fetchMovieById } from "../../services/api";
import s from "./MovieDetailsPage.module.css";
import clsx from "clsx";
import Loader from "../../components/Loader/Loader";

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState({});
  const { movieId } = useParams();
  const location = useLocation();
  const goBackRef = useRef(location.state?.from || "/");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true);
      try {
        const data = await fetchMovieById(movieId);
        setMovie(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieDetails();
  }, [movieId]);
  const setActiveClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
  };
  return (
    <div>
      <Link to={goBackRef.current || "/movies"} className={s.goBack}>
        ← Go back
      </Link>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={s.movie}>
            <div>
              <img
                className={s.img}
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={movie.title}
              />
            </div>
            <div className={s.details}>
              <p className={s.title}>{movie.title}</p>
              <p className={s.infoText}>
                <span className={s.label}>Rating:</span> {movie.vote_average} (
                {movie.vote_count} голосів)
              </p>
              <p className={s.infoText}>
                <span className={s.label}>Release Date:</span>{" "}
                {movie.release_date}
              </p>
              <p className={s.infoText}>
                <span className={s.label}>Overview:</span> {movie.overview}
              </p>
              {movie.genres && (
                <p className={s.infoText}>
                  <span className={s.label}>Genre:</span>{" "}
                  {movie.genres.map((genre) => genre.name).join(", ")}
                </p>
              )}
            </div>
          </div>

          <h3>Additional information</h3>
          <nav className={s.nav}>
            <NavLink className={setActiveClass} to="cast">
              Cast
            </NavLink>
            <NavLink className={setActiveClass} to="reviews">
              Reviews
            </NavLink>
          </nav>

          <Outlet />
        </>
      )}
    </div>
  );
};

export default MovieDetailsPage;
