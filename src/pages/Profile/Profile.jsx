import styles from "./Profile.module.css";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import EditProfile from "../../components/EditProfile/EditProfile.jsx";
import Users from "../../components/Users/Users.jsx";
import { GlobalContext } from "../../context/GlobalProvider.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import Categories from "../../components/Categories/Categories.jsx";
import Genres from "../../components/Genres/Genres.jsx";
import MoviesList from "../../components/MoviesList/MoviesList.jsx";
import AddMovies from "../../components/AddMovies/AddMovies.jsx";
import Language from "../../components/Languages/Language.jsx";
import Casts from "./../../components/Casts/Casts";
function Profile() {
  const [isActive, setIsActive] = useState("profile");
  const { auth, setIsRefresh, isRefresh } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [popUp, setPopUp] = useState(false);
  const signOut = (e) => {
    e.preventDefault();
    localStorage.clear("datas");
    localStorage.setItem("isShow", JSON.stringify(false));
    setPopUp(false);
    navigate("/");
    window.location.reload(true);
  };

  return (
    <section className={styles.profile__section}>
      {popUp && (
        <div className={styles.popUp__blur}>
          <div className={styles.popUp}>
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <h2>Sign Out</h2>
            <span>Are you sure you are almost signed out?</span>
            <div className={styles.popUp__btns}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setPopUp(false);
                }}
              >
                No
              </button>
              <button onClick={signOut}>Yes</button>
            </div>
          </div>
        </div>
      )}
      <div className={styles.profile__left}>
        <Link to="/" className={styles.profile__logo}>
          <img src={logo} />
          <span>FILM24</span>
        </Link>
        <ul className={styles.profile__lists}>
          <li
            onClick={() => {
              setIsActive("profile");
            }}
            className={isActive == "profile" ? `${styles.profile__active}` : ""}
          >
            <i className="fa-solid fa-user-pen"></i>
            <span>Edit profile</span>
          </li>
          {auth.isAdmin && (
            <li
              className={isActive == "users" ? `${styles.profile__active}` : ""}
              onClick={() => {
                setIsActive("users");
              }}
            >
              <i className="fa-solid fa-users"></i>
              <span>Users</span>
            </li>
          )}

          {auth.isAdmin && (
            <li
              className={
                isActive == "Movies List" ? `${styles.profile__active}` : ""
              }
              onClick={() => {
                setIsActive("Movies List");
              }}
            >
              <i className="ri-file-list-line"></i>
              <span>Movies List</span>
            </li>
          )}
          {auth.isAdmin && (
            <li
              className={
                isActive == "Add Movie" ? `${styles.profile__active}` : ""
              }
              onClick={() => {
                setIsActive("Add Movie");
              }}
            >
              <i className="ri-movie-2-line"></i>
              <span>Add Movie</span>
            </li>
          )}
          {auth.isAdmin && (
            <li
              className={
                isActive == "Categories" ? `${styles.profile__active}` : ""
              }
              onClick={() => {
                setIsActive("Categories");
              }}
            >
              <i className="ri-play-list-add-fill"></i>
              <span>Categories</span>
            </li>
          )}
          {auth.isAdmin && (
            <li
              className={
                isActive == "Genres" ? `${styles.profile__active}` : ""
              }
              onClick={() => {
                setIsActive("Genres");
              }}
            >
              <i className="ri-play-list-add-fill"></i>
              <span>Genres</span>
            </li>
          )}
          {auth.isAdmin && (
            <li
              className={
                isActive == "Languages" ? `${styles.profile__active}` : ""
              }
              onClick={() => {
                setIsActive("Languages");
              }}
            >
              <i className="ri-play-list-add-fill"></i>
              <span>Languages</span>
            </li>
          )}
          {auth.isAdmin && (
            <li
              className={isActive == "Casts" ? `${styles.profile__active}` : ""}
              onClick={() => {
                setIsActive("Casts");
              }}
            >
              <i className="ri-play-list-add-fill"></i>
              <span>Casts</span>
            </li>
          )}
          <li
            onClick={() => {
              setPopUp(true);
            }}
            className={styles.profile__signOut}
          >
            <i className="ri-logout-box-r-line"></i>
            <span>Sign out</span>
          </li>
        </ul>
      </div>
      <div className={styles.profile__right}>
        <div className={styles.right__top}>
          <Link to="/">
            <i className="fa-solid fa-house"></i>
          </Link>
          <div className={styles.profile__slash}>
            <i className="fa-solid fa-chevron-right"></i>
          </div>
          <Link to="/profile">{isActive}</Link>
          <div
            onClick={() => {
              setIsRefresh(!isRefresh);
            }}
            className={styles.refreshPage}
          >
            <i className="fa-solid fa-rotate-right"></i>
          </div>
        </div>
        <div className={styles.right__bottom}>
          {isActive === "profile" && <EditProfile />}
          {isActive === "users" && <Users />}
          {isActive === "Movies List" && <MoviesList />}
          {isActive === "Add Movie" && <AddMovies />}
          {isActive === "Categories" && <Categories />}
          {isActive === "Genres" && <Genres />}
          {isActive === "Languages" && <Language />}
          {isActive === "Casts" && <Casts />}
        </div>
      </div>
    </section>
  );
}

export default Profile;
