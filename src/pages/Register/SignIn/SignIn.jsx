import styles from "../Register.module.css";
import googleIcon from "../../../assets/GoogleIcon.svg";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { API_URL } from "../../../API/API.jsx";
import axios from "axios";
import Loading from "../../../components/Loading/Loading.jsx";
import { GlobalContext } from "../../../context/GlobalProvider.jsx";
function SignIn() {
  const { setAuth } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [isAllowed, setIsAllowed] = useState(true);
  const [openEye, setOpenEye] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState(false);
  useEffect(() => {
    if (email && password) {
      setIsAllowed(false);
    } else {
      setIsAllowed(true);
    }
  }, [email, password]);
  const changeText = () => {
    setErrMessage(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { email, password };
    setLoading(true);
    axios
      .post(API_URL + "/users/login", body)
      .then((res) => {
        setLoading(false);
        setAuth(res.data);
        navigate("/");
        window.location.reload(true);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setErrMessage(true);
        }
        setLoading(false);
      });
    setEmail("");
    setPassword("");
    setTimeout(changeText, 3000);
  };
  return (
    <>
      {loading && <Loading className={"loadingBlue"} />}
      {!loading && (
        <div className={styles.register__section}>
          <h1>Login</h1>
          <p style={errMessage ? { color: "red" } : {}}>
            {errMessage
              ? "Incorrect Email or Password"
              : "Please enter your Email and your Password"}
          </p>
          <form className={styles.register__form}>
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
            <div>
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
            <span title="Coming soon...">Forgot password?</span>
            <button
              onClick={handleSubmit}
              disabled={isAllowed ? true : false}
              className={isAllowed ? `${styles.notAllowed}` : ""}
            >
              Login
            </button>
          </form>
          <button className={styles.register__googleBtn}>
            <img src={googleIcon} />
            <span>Or, sign-in with Google</span>
          </button>
          <div className={styles.register__register}>
            Not a member yet? <Link to="/sign-up">Register!</Link>
          </div>
          <div className={styles.register__backWebsite}>
            <Link to="/">Back To Website</Link>
          </div>
        </div>
      )}
    </>
  );
}

export default SignIn;
