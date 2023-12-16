import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../API/API.jsx";
import Loading from "../Loading/Loading.jsx";
import styles from "./SingleBigMovie.module.css";
function SingleBigMovie() {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [casts, setCasts] = useState([]);
  const [movies, setMovies] = useState([]);
  const [castsId, setCastsId] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios.get(API_URL + `/movies`).then((res) => {
      setMovies(res.data.movies);
      setLoading(false); // Ma'lumotlar olinganidan so'ng loading false qilamiz
    });
  }, []);

  useEffect(() => {
    if (movies.length !== 0) {
      const list = [];
      movies.map((movie) => {
        if (movie._id === id) {
          if (movie.casts.length !== 0) {
            movie.casts.map((cast) => {
              list.push(cast._id);
            });
          } else {
            setLoading(false);
          }
        }
      });
      setCastsId(list);
    }
  }, [movies]);

  useEffect(() => {
    if (castsId.length === 0) {
      setLoading(false);
      return;
    }

    const fetchCasts = async () => {
      const promises = castsId.map((castId) =>
        axios.get(API_URL + `/casts/${castId}`)
      );
      try {
        const castResponses = await Promise.all(promises);
        const newCasts = castResponses.map((res) => res.data);
        setCasts(newCasts);
      } catch (error) {
        console.error("Error fetching cast data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCasts();
  }, [castsId]);

  const renderStars = (movie) => {
    const stars = [];
    if (movie._id === id) {
      for (let i = 1; i <= movie.rate; i++) {
        stars.push(<i key={i} className="ri-star-fill"></i>);
      }
    }
    return stars;
  };
  const isShow = JSON.parse(localStorage.getItem("isShow"))
    ? JSON.parse(localStorage.getItem("isShow"))
    : false;
  return (
    <>
      {loading && <Loading className={"loadingProfile"} />}
      {!loading &&
        movies.map((movie) => {
          if (movie._id === id) {
            return (
              <div key={movie._id} className={styles.bigMovieSection}>
                <div className={styles.bigMovieBanner}>
                  <div className={styles.bigMovieImg}>
                    <div className={styles.bannerBackground1}></div>
                    <div className={styles.bannerImg}>
                      <img src={movie.titleImage?.url} />
                    </div>
                    <div className={styles.bannerBackground2}></div>
                    <div className={styles.bannerBackground3}></div>
                    <div className={styles.bannerBackground4}></div>
                  </div>
                  <div className={`${styles.bigMovieTexts} container`}>
                    <div className={styles.bigMovie_textbox}>
                      <h1>{movie.name}</h1>
                      <p>{movie.desc}</p>
                      <div className={styles.bigMovieInfos}>
                        <div className={styles.bigMovieInfos__top}>
                          <span>
                            <i className="ri-calendar-2-fill"></i> {movie.year}
                          </span>
                          {movie?.genre.length !== 0 ? (
                            movie.genre.map((genr) => {
                              return <span key={genr._id}> | {genr.name}</span>;
                            })
                          ) : (
                            <span>| No Genre</span>
                          )}
                          <span>
                            {" "}
                            <i className="ri-time-line"></i> {movie.time}m
                          </span>
                        </div>
                        <span className={styles.bigMovieStars}>
                          {movie.rate > 0 ? renderStars(movie) : <p>No Rate</p>}
                        </span>
                      </div>
                      <div className={styles.bigMovieBtns}>
                        {isShow && (
                          <button>
                            <i className="ri-play-circle-line"></i>
                            <span>Watch</span>
                          </button>
                        )}
                        {!isShow && (
                          <Link to="/">
                            <i className="ri-login-circle-line"></i>
                            <span>Sign In</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        })}
      {
        <div className={styles.bigMovieCasts}>
          {!loading &&
            casts.map((cast) => (
              <div key={cast._id}>
                <div className={styles.cast__img}>
                  <img src={cast.image.url} alt="" />
                </div>
                <span>
                  {cast.name} {cast.surname}
                </span>
              </div>
            ))}
        </div>
      }
    </>
  );
}

export default SingleBigMovie;
