import React, { useContext, useEffect, useState } from "react";
import styles from "./Movies.module.css";
import axios from "axios";
import { API_URL } from "../../API/API.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import SingleMovie from "../../components/SingleMovie/SingleMovie.jsx";
import { GlobalContext } from "./../../context/GlobalProvider";
function MoviesPage() {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get(API_URL + "/movies")
      .then((res) => {
        setLoading(false);
        setMovies(res.data.movies);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  return (
    <section className={styles.movies__section}>
      {loading && <Loading className={"loadingProfile"} />}
      {!loading && (
        <div className={styles.movies__cards}>
          {movies.map((movie) => (
            <SingleMovie key={movie._id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  );
}

export default MoviesPage;
