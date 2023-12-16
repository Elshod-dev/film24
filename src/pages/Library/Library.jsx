import { useEffect, useState } from "react";
import styles from "./Library.module.css";
import axios from "axios";
import { API_URL } from "../../API/API.jsx";

function Library() {
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   axios
  //     .get(API_URL + "/movies")
  //     .then((res) => {
  //       console.log(res.data.movies);
  //       setMovie(res.data.movies);
  //       setLoading(true);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);
  return (
    <section className={styles.lists__section}>
      {/* {loading && (
        <>
          <img src={movie[movie.length - 1].titleImage.url} alt="" />
        </>
      )} */}
      <h1>Library</h1>
    </section>
  );
}

export default Library;
