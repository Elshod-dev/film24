import { Link } from "react-router-dom";
import styles from "./SingleMovie.module.css";
function SingleMovie({ movie }) {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= movie.rate; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M7.99992 3.61355L8.95832 6.36522L9.13362 6.86853H9.66659H12.5205L10.3105 8.62808L9.91732 8.94117L10.0574 9.42388L10.8684 12.2179L8.41976 10.5637L7.99992 10.2801L7.58008 10.5637L5.13146 12.2179L5.94242 9.42388L6.08252 8.94117L5.6893 8.62808L3.47933 6.86853H6.33325H6.86622L7.04152 6.36522L7.99992 3.61355Z"
            fill="white"
            stroke="white"
            strokeWidth="1.5"
          />
        </svg>
      );
    }
    return stars;
  };
  return (
    <div className={styles.movie__card}>
      <Link to={`/movies/${movie._id}`} className={styles.movie__card}>
        <div className={styles.movie__card__img}>
          <img loading="lazy" src={movie.image.url} />
          <div className={styles.movie__card__overlay}></div>
        </div>
        <div className={styles.movie__card__content}>
          <span>{movie.genre[0]?.name ? movie.genre[0].name : "No Genre"}</span>
          <div className={styles.movie__card__stars}>
            {movie.rate > 0 ? renderStars() : <p>No Rate</p>}
          </div>
          <h1>{movie.name}</h1>
        </div>
      </Link>
      <div className={styles.heart}>
        <i className="ri-heart-fill"></i>
      </div>
    </div>
  );
}

export default SingleMovie;
