import styles from "./Genres.module.css";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { API_URL } from "../../API/API.jsx";
import Loading from "../Loading/Loading.jsx";
import { GlobalContext } from "../../context/GlobalProvider.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
function Genres() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [errMessage, setErrMessage] = useState(false);
  const [errMessageText, setErrMessageText] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [successMessageText, setSuccessMessageText] = useState("");
  const [id, setId] = useState("");
  const { isRefresh, setIsRefresh } = useContext(GlobalContext);
  const genreValue = useRef();
  const timeoutRef = useRef(null);
  const datas = JSON.parse(localStorage.getItem("datas"));
  const config = {
    headers: {
      Authorization: `Bearer ${datas.token}`,
    },
  };
  useEffect(() => {
    setLoading(false);
    axios
      .get(API_URL + "/genres")
      .then((res) => {
        setGenres(res.data);
        setLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isRefresh]);
  const deleteCategory = (e) => {
    e.preventDefault();
    console.log(config);
    setPopUp(false);
    setErrMessage(false);
    axios
      .delete(API_URL + "/genres/" + id, config)
      .then((res) => {
        setSuccessMessage(true);
        setSuccessMessageText("Genre successfully deleted!");
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          setSuccessMessage(false);
        }, 7000);
        setId("");
        setIsRefresh(!isRefresh);
      })
      .catch((err) => {
        console.log(err);
        setId("");
      });
  };

  const createHandle = (e) => {
    const checkInputValidity = (inputWord, data) => {
      return data.some(
        (item) => item.name.toLowerCase() === inputWord.toLowerCase()
      );
    };
    e.preventDefault();
    if (genreValue.current.value === "") {
      setSuccessMessage(false);
      setErrMessage(true);
      setErrMessageText("This field cannot be empty");
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setErrMessage(false);
      }, 7000);
      return;
    }

    if (checkInputValidity(genreValue.current.value, genres)) {
      setSuccessMessage(false);
      setErrMessage(true);
      setErrMessageText("This category already exists.");
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setErrMessage(false);
      }, 7000);
      return;
    } else {
      axios
        .post(API_URL + "/genres", { name: genreValue.current.value }, config)
        .then((res) => {
          setSuccessMessage(true);
          setIsRefresh(!isRefresh);
          setSuccessMessageText("Genre created successfully!");
          genreValue.current.value = "";
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          timeoutRef.current = setTimeout(() => {
            setSuccessMessage(false);
          }, 7000);
          return;
        })
        .catch((err) => {
          console.log(err);
          genreValue.current.value = "";
        });
    }
  };
  return (
    <div className={styles.categories__section}>
      {!loading && <Loading className={"loadingProfile"} />}
      {popUp && (
        <div className={styles.popUp__blur}>
          <div className={styles.popUp}>
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <h2>Delete</h2>
            <span>
              Are you sure you are almost delete this genre? <br /> This may
              cause some errors!!!
            </span>
            <div className={styles.popUp__btns}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setId("");
                  setPopUp(false);
                }}
              >
                No
              </button>
              <button onClick={deleteCategory}>Yes</button>
            </div>
          </div>
        </div>
      )}
      {loading && (
        <div className={styles.addCategory}>
          <form>
            <div className={styles.inputDiv}>
              <label htmlFor="category">Add Genre</label>
              <input
                ref={genreValue}
                id="category"
                type="text"
                placeholder="Genre"
                onChange={() => {
                  setErrMessage(false);
                  setSuccessMessage(false);
                }}
              />
            </div>
            <button onClick={createHandle}>
              <i className="fa-solid fa-circle-plus"></i> Create
            </button>
          </form>
          {errMessage && (
            <div className={styles.errMessage}>
              <i className="ri-information-fill"></i>
              <div>
                <span>{errMessageText}</span>
                <i
                  onClick={() => {
                    setErrMessage(false);
                  }}
                  className="ri-close-line"
                ></i>
              </div>
            </div>
          )}
          {successMessage && (
            <div className={styles.successMessage}>
              <i className="ri-checkbox-circle-fill"></i>
              <div>
                <span>{successMessageText}</span>
                <i
                  onClick={() => {
                    setSuccessMessage(false);
                  }}
                  className="ri-close-line"
                ></i>
              </div>
            </div>
          )}
        </div>
      )}
      {loading && (
        <div className={styles.categories}>
          <div className={styles.categories__head}>
            <span>ID</span>
            <span>TITLE</span>
            <span>ACTIONS</span>
          </div>
          <div className={styles.categories__body}>
            {genres.map((genre) => (
              <div key={genre._id} className={styles.categories__infos}>
                <span>{genre._id}</span>
                <span>{genre.name}</span>
                <span>
                  <i className="fa-regular fa-pen-to-square"></i>
                  <i
                    onClick={() => {
                      setId(genre._id);
                      setPopUp(true);
                    }}
                    className="fa-solid fa-trash"
                  ></i>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Genres;
