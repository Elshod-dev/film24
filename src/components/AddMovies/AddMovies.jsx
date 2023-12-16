import { Fragment, useEffect, useRef, useState } from "react";
import styles from "./AddMovies.module.css";
import { API_URL } from "./../../API/API";
import axios from "./../../../../form-api/src/api/axios";
import Loading from "../Loading/Loading.jsx";
function AddMovies() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [genres, setGenres] = useState([]);
  const [removedGenres, setRemovedGenres] = useState([]);
  const imageRef = useRef();
  const imageRef2 = useRef();
  const videoRef = useRef();
  const [popUp, setPopUp] = useState(false);
  const stars = [0, 1, 2, 3, 4];
  const [languages, setLanguages] = useState([]);
  const [casts, setCasts] = useState([]);
  const [selectCasts, setSelectCasts] = useState([]);
  const [starIndex, setStarIndex] = useState(1);
  const [body, setBody] = useState({
    time: "",
    language: [],
    year: "",
    image: "",
    titleImage: "",
    desc: "",
    category: "",
    type: "",
    genre: "",
    casts: [],
    rate: 1,
  });
  useEffect(() => {
    setBody({ ...body, genre: removedGenres });
  }, [removedGenres]);
  const handleSelectChange2 = (e) => {
    const selectedValue = e.target.value;

    if (selectedValue) {
      // setSelectedGenre(selectedValue);
      setRemovedGenres((prevRemovedGenres) => [
        ...prevRemovedGenres,
        selectedValue,
      ]);
    }
  };
  const removeSelectGenre = (id) => {
    const item = removedGenres.filter((index) => index !== id);
    setRemovedGenres(item);
  };
  useEffect(() => {
    axios.get(API_URL + "/categories").then((res) => {
      setCategories(res.data);
    });
    axios.get(API_URL + "/genres").then((res) => {
      setGenres(res.data);
    });
    axios.get(API_URL + "/languages").then((res) => {
      setLanguages(res.data);
    });
    axios.get(API_URL + "/casts").then((res) => {
      setCasts(res.data);
    });
  }, []);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const datas = JSON.parse(localStorage.getItem("datas"));
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${datas.token}`,
    },
  };
  useEffect(() => {
    setBody({ ...body, casts: selectCasts });
  }, [selectCasts]);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      axios
        .post(API_URL + "/images/upload", { image: file }, config)
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
  const handleImageChange2 = (e) => {
    const file = e.target.files[0];
    if (file) {
      axios
        .post(API_URL + "/images/upload", { image: file }, config)
        .then((res) => {
          console.log(res.data.data._id);
          setBody({ ...body, titleImage: res.data.data._id });
          setSelectedImage2(res.data.data.url);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const isBodyValid = () => {
    for (const key in body) {
      if (body.genre.length == 0) {
        return true;
      }
      if (body.language.length == 0) {
        return true;
      }
      if (body.casts.length == 0) {
        return true;
      }
      if (body[key] === "") {
        return true;
      }
    }
    return false;
  };
  const publishHandler = (e) => {
    e.preventDefault();
    console.log(body);
    setLoading(true);
    const config1 = {
      headers: {
        Authorization: `Bearer ${datas.token}`,
      },
    };
    axios
      .post(API_URL + "/movies", body, config1)
      .then((res) => {
        console.log(res.data);
        axios
          .put(
            API_URL + `/movies/${res.data._id}`,
            { genre: body.genre },
            config1
          )
          .then((res) => {
            console.log(res.data);
          });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const addCasts = (cast) => {
    setSelectCasts([...selectCasts, cast]);
  };

  const removeCasts = (cast) => {
    const newCasts = selectCasts.filter(
      (selectCast) => selectCast._id !== cast._id
    );
    setSelectCasts(newCasts);
  };
  return (
    <div className={styles.addMovies__section}>
      {loading && <Loading className={"loadingProfile"} />}
      {!loading && (
        <div className={styles.addMovies__div}>
          <h2>Create Movie</h2>
          <form>
            <div className={styles.form__title}>
              <div>
                <label htmlFor="">Movie Title</label>
                <input
                  onChange={(e) => {
                    setBody({ ...body, name: e.target.value });
                  }}
                  type="text"
                  placeholder="Ko'chadagi dumbullar"
                />
              </div>
              <div>
                <label htmlFor="">Duration</label>
                <input
                  onChange={(e) => {
                    setBody({ ...body, time: e.target.value });
                  }}
                  type="number"
                  placeholder="140"
                />
              </div>
            </div>
            <div className={styles.form__language}>
              <div>
                <label htmlFor="">Language</label>
                <select
                  onChange={(e) => {
                    console.log(e.target.value);
                    setBody({
                      ...body,
                      language: [e.target.value],
                    });
                  }}
                >
                  <option value="">Language</option>
                  {languages.map((language) => (
                    <option key={language._id} value={language._id}>
                      {language.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="">Year of Release</label>
                <input
                  onChange={(e) => {
                    setBody({ ...body, year: e.target.value });
                  }}
                  type="number"
                  placeholder="2022"
                />
              </div>
            </div>
            <div className={styles.form__images}>
              <div className={styles.form__images__div}>
                <label>Image for Card</label>
                <div
                  onClick={() => {
                    imageRef.current.click();
                  }}
                >
                  <input
                    ref={imageRef}
                    onChange={handleImageChange}
                    type="file"
                    id="image"
                    accept="image/*"
                  />
                  <i className="ri-upload-fill"></i>
                  <span>Drag your image here</span>
                  <p>(only .jpg and .png files will be accepted)</p>
                </div>
                <span className={styles.form__images__span}>
                  <img src={selectedImage} alt="" />
                </span>
              </div>
              <div className={styles.form__images__div}>
                <label htmlFor="">Image for Banner</label>
                <div
                  onClick={() => {
                    imageRef2.current.click();
                  }}
                >
                  <input
                    ref={imageRef2}
                    onChange={handleImageChange2}
                    type="file"
                    accept="image/*"
                  />
                  <i className="ri-upload-fill"></i>
                  <span>Drag your image here</span>
                  <p>(only .jpg and .png files will be accepted)</p>
                </div>
                <span className={styles.form__images__span2}>
                  <img src={selectedImage2} alt="" />
                </span>
              </div>
            </div>
            <div className={styles.form__desc}>
              <label htmlFor="">Movie Description</label>
              <textarea
                onChange={(e) => {
                  setBody({ ...body, desc: e.target.value });
                }}
                placeholder="Make it short and sweet"
              ></textarea>
            </div>
            <div className={styles.form__category}>
              <div className={styles.form__category__selected}>
                <label htmlFor="">Movie Category</label>
              </div>
              <select
                onChange={(e) => {
                  categories.map((category) => {
                    if (category._id === e.target.value) {
                      setBody({
                        ...body,
                        type: "movie",
                        category: [e.target.value],
                      });
                    }
                  });
                }}
              >
                <option value="">Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.form__genre}>
              <div className={styles.form__category__selected}>
                <label htmlFor="">Movie Genre</label>
                {genres.map(
                  (genre) =>
                    removedGenres.includes(genre._id) && (
                      <span key={genre._id}>
                        {genre.name}
                        <i
                          onClick={() => {
                            removeSelectGenre(genre._id);
                          }}
                          className="ri-close-line"
                        ></i>
                      </span>
                    )
                )}
              </div>
              <select onChange={handleSelectChange2}>
                <option value="">Genre</option>
                {genres.map(
                  (genre) =>
                    !removedGenres.includes(genre._id) && (
                      <option key={genre._id} value={genre._id}>
                        {genre.name}
                      </option>
                    )
                )}
              </select>
            </div>
            <div className={styles.form__stars}>
              <label htmlFor="">Movie Rate</label>
              <div>
                {stars.map((_, i) => (
                  <Fragment key={i}>
                    <label
                      style={starIndex >= i + 1 ? { color: "gold" } : {}}
                      htmlFor={`star${i + 1}`}
                    >
                      <i className="fa-solid fa-star"></i>
                    </label>
                    <input
                      id={`star${i + 1}`}
                      type="checkbox"
                      value={i + 1}
                      onClick={(e) => {
                        setStarIndex(i + 1);
                        setBody({ ...body, rate: e.target.value });
                      }}
                    />
                  </Fragment>
                ))}
              </div>
            </div>
            <div className={styles.form__video}>
              <label htmlFor="">Movie Video</label>
              <div
                onClick={() => {
                  videoRef.current.click();
                }}
              >
                <input
                  ref={videoRef}
                  type="file"
                  accept="video/mp4,video/x-m4v,video/*"
                />
                <i className="ri-upload-fill"></i>
                <span>Drag your video here</span>
              </div>
            </div>
            <div className={styles.form__casts}>
              <div className={styles.form__btn}>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setPopUp(true);
                  }}
                >
                  Add Cast
                </button>
                {popUp && (
                  <div className={styles.casts__popup}>
                    <div className={styles.casts__cards}>
                      {casts.map((cast) => (
                        <div
                          key={cast._id}
                          className={styles.casts__cards__img}
                        >
                          <div>
                            <img src={cast.image?.url} alt="" />
                          </div>
                          <span>
                            {cast.name} {cast.surname}
                          </span>
                          {!selectCasts.some(
                            (selectCast) => selectCast._id === cast._id
                          ) && (
                            <span
                              onClick={() => {
                                addCasts(cast);
                              }}
                            >
                              <i className="ri-add-circle-line"></i>
                            </span>
                          )}
                          {selectCasts.some(
                            (selectCast) => selectCast._id === cast._id
                          ) && (
                            <span
                              onClick={() => {
                                removeCasts(cast);
                              }}
                            >
                              <i className="ri-close-circle-line"></i>
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setPopUp(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
              <div className={styles.form__casts__cards}>
                {selectCasts.map((selectCast) => (
                  <div
                    key={selectCast._id}
                    className={styles.form__casts__card}
                  >
                    <img src={selectCast.image?.url} alt="No Image" />
                    <span>
                      {selectCast.name}
                      {' '}{selectCast.surname}
                    </span>
                    <div className={styles.form__casts__icons}>
                      <i
                        onClick={() => {
                          removeCasts(selectCast);
                        }}
                        className="fa-solid fa-trash"
                      ></i>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              style={isBodyValid() ? { opacity: 0.5 } : {}}
              disabled={isBodyValid()}
              onClick={publishHandler}
              className={styles.form__publishBtn}
            >
              <i className="fa-solid fa-upload"></i> Publish Movie
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AddMovies;
