import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";
import homeImg from "../../assets/image-removebg-preview.png";
import homeBackground from "../../assets/homeBackground.png";
import homeBackground2 from "../../assets/homeBackground2.png";
import homeBackground3 from "../../assets/homeBackground3.png";
import homeBackground4 from "../../assets/homeBackground4.png";

import { useState } from "react";
import Loading from "../../components/Loading/Loading.jsx";
function HomePage() {
  const [isShow, setIsShow] = useState(true);
  const isShow2 = JSON.parse(localStorage.getItem("isShow"))
    ? JSON.parse(localStorage.getItem("isShow"))
    : false;
  return (
    <section className={styles.home__section}>
      {isShow && <Loading className={"loading"} />}
      {!isShow2 && (
        <div className={styles.homePage}>
          <div className={styles.home__texts}>
            <div className={`${styles.home__container} container`}>
              <h1>Let's Make Your Own Cinema</h1>
              <p>
                You can still enjoy the latest movies and other movies online
                and at a lower price
              </p>
              <Link to="sign-in">Get Started</Link>
            </div>
          </div>
          <div className={styles.homePage__img}>
            <img
              loading="lazy"
              onLoad={() => {
                setIsShow(false);
              }}
              src={homeImg}
            />
          </div>
        </div>
      )}
      {isShow2 && (
        <>
          <div className={`${styles.homePage__bannerTexts} container`}>
            <h1>
              Your ultimate destination for top-quality TV shows, movies, and
              more
            </h1>
            <p>A Library of movies and TV shows you can watch any where</p>
            <div className={styles.homePage__bannerBtns}>
              <Link to='/movies'>
                <i className="fa-solid fa-play"></i>
                <span>Watch Movies</span>
              </Link>
              <Link to='/library'>Library</Link>
            </div>
          </div>
          <div className={styles.homePage__banners}>
            <span className={styles.homePage__banners__blur}></span>
            <span className={styles.homePage__banners__blur2}></span>
            <div className={styles.homePage__toRight}>
              <img
                loading="lazy"
                onLoad={() => {
                  setIsShow(false);
                }}
                src={homeBackground}
              />
              <img src={homeBackground} />
            </div>
            <div className={styles.homePage__toLeft}>
              <img src={homeBackground2} />
              <img src={homeBackground2} />
            </div>
            <div className={styles.homePage__toRight}>
              <img src={homeBackground3} />
              <img src={homeBackground3} />
            </div>
            <div className={styles.homePage__toLeft}>
              <img src={homeBackground4} />
              <img src={homeBackground4} />
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default HomePage;
