import { Link } from "react-router-dom";
import styles from "./PageNotFound.module.css";
import img from "../../assets/PageNotFounImg.png";
function PageNotFound() {
  return (
    <div className={styles.pagenotFound}>
      <div>
        <h1>404-error</h1>
        <h2>PAGE NOT FOUND</h2>
        <span>Your search has ventured beyond the known universe.</span>
        <Link to="/">Back To Home</Link>
      </div>
      <div>
        <img src={img} alt="" />
        <span className={styles.backFilter}></span>
      </div>
    </div>
  );
}

export default PageNotFound;
