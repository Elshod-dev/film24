import { useContext, useEffect, useRef, useState } from "react";
import styles from "../Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../API/API.jsx";
import { GlobalContext } from "../../../context/GlobalProvider.jsx";
import Loading from "../../../components/Loading/Loading.jsx";

function SignUp() {
  const navigate = useNavigate();
  const { setAuth } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [isAllowed, setIsAllowed] = useState(true);
  const [openEye, setOpenEye] = useState(false);
  const [openEye2, setOpenEye2] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [openPassword2, setOpenPassword2] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  useEffect(() => {
    if (fullName && email && password && password == rePassword) {
      setIsAllowed(false);
    } else {
      setIsAllowed(true);
    }
  }, [fullName, email, password, rePassword]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const body = { fullName, email, password };
    setLoading(true);
    axios
      .post(API_URL + "/users", body, config)
      .then((res) => {
        setLoading(false);
        setAuth(res.data);
        navigate("/");
        window.location.reload(true);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <>
      {loading && <Loading className={"loadingBlue"} />}
      {!loading && (
        <div className={styles.register__section}>
          <h1>Register</h1>
          <p>Please enter your Name, Email and your Password</p>
          <form className={styles.register__form}>
            <div className={styles.register__username}>
              <i className="fa-regular fa-user"></i>
              <input
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
                placeholder="Username"
                type="text"
              />
            </div>
            <div className={styles.register__email}>
              <i className="fa-regular fa-user"></i>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Email"
                type="email"
              />
            </div>
            <div className={styles.register__password}>
              <i className="ri-lock-line"></i>
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (e.target.value === "") {
                    setOpenEye(false);
                    setOpenPassword(false);
                  } else {
                    setOpenEye(true);
                  }
                }}
                placeholder="Password"
                type={openPassword ? "text" : "password"}
              />
              {openEye && (
                <i
                  onClick={() => {
                    setOpenPassword(!openPassword);
                  }}
                  className={openPassword ? "ri-eye-line" : "ri-eye-off-line"}
                ></i>
              )}
            </div>
            <div>
              <i className="ri-lock-line"></i>
              <input
                value={rePassword}
                placeholder="Re-enter Password"
                onChange={(e) => {
                  setRePassword(e.target.value);
                  if (e.target.value === "") {
                    setOpenEye2(false);
                    setOpenPassword2(false);
                  } else {
                    setOpenEye2(true);
                  }
                }}
                type={openPassword2 ? "text" : "password"}
              />
              {openEye2 && (
                <i
                  onClick={() => {
                    setOpenPassword2(!openPassword2);
                  }}
                  className={openPassword2 ? "ri-eye-line" : "ri-eye-off-line"}
                ></i>
              )}
            </div>
            <button
              onClick={handleSubmit}
              disabled={isAllowed ? true : false}
              className={isAllowed ? `${styles.notAllowed}` : ""}
            >
              Register
            </button>
          </form>
          <div className={styles.register__register}>
            Already have an Account? <Link to="/sign-in">Login!</Link>
          </div>
          <div className={styles.register__backWebsite}>
            <Link to="/">Back To Website</Link>
          </div>
        </div>
      )}
    </>
  );
}

export default SignUp;
