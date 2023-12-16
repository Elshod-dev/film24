import styles from "./Casts.module.css";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { API_URL } from "../../API/API.jsx";
import Loading from "../Loading/Loading.jsx";
import { GlobalContext } from "../../context/GlobalProvider.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
function Casts() {
  const [casts, setCasts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [errMessage, setErrMessage] = useState(false);
  const [errMessageText, setErrMessageText] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [successMessageText, setSuccessMessageText] = useState("");
  const [id, setId] = useState("");
  const { isRefresh, setIsRefresh } = useContext(GlobalContext);
  const castValue = useRef();
  const timeoutRef = useRef(null);
  const imgInput = useRef();
  const [body, setBody] = useState({
    name: "",
    surname: "",
    image: "",
    birthday: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const datas = JSON.parse(localStorage.getItem("datas"));
  const config = {
    headers: {
      Authorization: `Bearer ${datas.token}`,
    },
  };
  const config1 = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${datas.token}`,
    },
  };
  useEffect(() => {
    setLoading(false);
    axios
      .get(API_URL + "/casts")
      .then((res) => {
        setCasts(res.data);
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
      .delete(API_URL + "/casts/" + id, config)
      .then((res) => {
        setSuccessMessage(true);
        setSuccessMessageText("Cast successfully deleted!");
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
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      axios
        .post(API_URL + "/images/upload", { image: file }, config1)
        .then((res) => {
          console.log(res.data.data._id);
          setBody({ ...body, image: res.data.data._id });
          setSelectedImage(res.data.data.url);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const createHandle = (e) => {
    console.log(body);
    const checkInputValidity = (inputWord, data) => {
      return data.some(
        (item) => item.name.toLowerCase() === inputWord.toLowerCase()
      );
    };
    e.preventDefault();
    if (castValue.current.value === "" || imgInput.current.value === "") {
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

    if (checkInputValidity(castValue.current.value, casts)) {
      setSuccessMessage(false);
      setErrMessage(true);
      setErrMessageText("This cast already exists.");
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setErrMessage(false);
      }, 7000);
      return;
    } else {
      axios
        .post(API_URL + "/casts", body, config)
        .then((res) => {
          setSuccessMessage(true);
          setIsRefresh(!isRefresh);
          setSuccessMessageText("Cast created successfully!");
          castValue.current.value = "";
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
          castValue.current.value = "";
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
              Are you sure you are almost delete this cast? <br /> This may
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
            <div className={styles.inputDiv1}>
              <label htmlFor="category">Add Cast</label>
              <div className={styles.inputDiv_inside}>
                <input
                  ref={castValue}
                  id="category"
                  type="text"
                  placeholder="Name"
                  onChange={(e) => {
                    setErrMessage(false);
                    setSuccessMessage(false);
                    setBody({ ...body, name: e.target.value });
                  }}
                />
                <input
                  ref={castValue}
                  id="category"
                  type="text"
                  placeholder="Surname"
                  onChange={(e) => {
                    setErrMessage(false);
                    setSuccessMessage(false);
                    setBody({ ...body, surname: e.target.value });
                  }}
                />
                <input
                  onChange={(e) => {
                    setBody({ ...body, birthday: e.target.value });
                  }}
                  ref={castValue}
                  type="date"
                />
                <div
                  className={styles.image__box}
                  onClick={() => {
                    imgInput.current.click();
                  }}
                >
                  <div className={styles.image__box__in}>
                    <img src={selectedImage} alt="" />
                  </div>
                  <input
                    onChange={handleImageChange}
                    ref={imgInput}
                    type="file"
                    accept="image/*"
                  />
                </div>
              </div>
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
            <span>IMAGE</span>
            <span>FULNAME</span>
            <span>ACTIONS</span>
          </div>
          <div className={styles.categories__body}>
            {casts.map((cast) => (
              <div key={cast._id} className={styles.categories__infos}>
                <span className={styles.casts__img}>
                  <img src={cast.image?.url} alt="image not found" />
                </span>
                <span>
                  {cast?.name} {cast?.surname}
                </span>
                <span>
                  <i className="fa-regular fa-pen-to-square"></i>
                  <i
                    onClick={() => {
                      setId(cast._id);
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

export default Casts;
