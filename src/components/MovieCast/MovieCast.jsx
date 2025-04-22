import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../services/api";
import s from "./MovieCast.module.css";
import noImage from "../../assets/img/no-img.jpg";
import Loader from "../Loader/Loader";

const MovieCast = () => {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getMovieCast = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMovieCast(movieId);
        setCast(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieCast();
  }, [movieId]);
  if (!isLoading && cast.length === 0) {
    return <p className={s.empty}>No cast yet.</p>;
  }
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <ul className={s.list}>
          {cast &&
            cast.map((item) => (
              <li key={item.id} className={s.card}>
                <img
                  className={s.img}
                  src={
                    item.profile_path
                      ? `https://image.tmdb.org/t/p/w500${item.profile_path}`
                      : noImage
                  }
                  alt={item.title}
                />
                <strong>{item.original_name}</strong>
                <p>{item.character}</p>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default MovieCast;
