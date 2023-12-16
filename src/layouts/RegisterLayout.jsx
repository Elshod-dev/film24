import { Outlet } from "react-router-dom";
import styles from "./Register.module.css";
function RegisterLayout() {
  return (
    <section className={styles.register__section}>
      <div className={styles.signIn__shape1}></div>
      <div className={styles.signIn__shape2}></div>
      <div className={styles.signIn__shape3}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="588"
          height="568"
          viewBox="0 0 588 568"
          fill="none"
        >
          <path
            d="M405.688 70C509.188 19 458.5 45.5 588.188 0V569.5H0C0 530.833 4.8961 478.274 66.6878 442.5C104.688 420.5 276.167 422.167 319 394.5C388.833 372.333 309.188 149.5 405.688 70Z"
            fill="#274FC7"
          />
        </svg>
      </div>
      <Outlet />
    </section>
  );
}

export default RegisterLayout;
