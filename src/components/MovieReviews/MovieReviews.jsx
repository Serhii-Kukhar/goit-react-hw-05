import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../services/api";
import s from "./MovieReviews.module.css";
import noImage from "../../assets/img/no-img.jpg";
import Loader from "../Loader/Loader";

const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getMovieReviews = async () => {
      setIsLoading(true);
      try {
        const data = await fetchMovieReviews(movieId);
        setReviews(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieReviews();
  }, [movieId]);

  if (!isLoading && reviews.length === 0) {
    return <p className={s.empty}>No reviews yet.</p>;
  }

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <ul className={s.list}>
          {reviews.map((item) => (
            <li key={item.id} className={s.card}>
              <img
                className={s.avatar}
                src={
                  item.author_details.avatar_path
                    ? `https://image.tmdb.org/t/p/w200${item.author_details.avatar_path}`
                    : noImage
                }
                alt={item.author}
              />
              <div className={s.content}>
                <div className={s.header}>
                  <h4 className={s.author}>{item.author}</h4>
                  <span className={s.date}>
                    {new Date(item.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className={s.text}>{item.content}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
