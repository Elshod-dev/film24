import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import {
  faRightToBracket,
  faUserGear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalProvider.jsx";

function Header() {
  const { auth } = useContext(GlobalContext);
  return (
    <header className={styles.header}>
      <nav className={`${styles.nav__container} container`}>
        <Link className={styles.logo}>Film24</Link>
        <ul className={styles.list__items}>
          <li className={styles.list__item}>
            <NavLink to="/" className={styles.list__link}>
              Home
            </NavLink>
          </li>
          <li className={styles.list__item}>
            <NavLink to="/movies" className={styles.list__link}>
              Movies
            </NavLink>
          </li>
          <li className={styles.list__item}>
            <NavLink to="library" className={styles.list__link}>
              Library
            </NavLink>
          </li>
        </ul>
        <div className={styles.btns}>
          {!auth && (
            <Link to="sign-in" className={styles.btn}>
              <p>Sign In</p>
              <FontAwesomeIcon icon={faRightToBracket} />
            </Link>
          )}
          {auth && (
            <Link to='/profile' className={styles.btn}>
              <p>Profile</p>
              <FontAwesomeIcon icon={faUserGear} />
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
