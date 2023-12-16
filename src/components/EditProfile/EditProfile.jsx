import { useContext, useEffect, useRef, useState } from "react";
import styles from "./EditProfile.module.css";
import { GlobalContext } from "./../../context/GlobalProvider";
import Loading from "./../Loading/Loading";
import axios from "axios";
import { API_URL } from "./../../API/API";

function EditProfile() {
  const { auth, setAuth, isWaiting, setIsWaiting } = useContext(GlobalContext);

  const [errMessage, setErrMessage] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [changeOpen, setChangeOpen] = useState(true);
  const [changeOpen2, setChangeOpen2] = useState(true);
  const [openSubmit, setOpenSubmit] = useState(true);
  const [savePassword, setSavePassword] = useState(true);

  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [openEye, setOpenEye] = useState(false);
  const [openEye2, setOpenEye2] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [openPassword2, setOpenPassword2] = useState(false);

  useEffect(() => {
    setFullName(auth.fullName);
    setEmail(auth.email);
  }, [auth]);

  useEffect(() => {
    if (!changeOpen || !changeOpen2) {
      if (fullName !== auth.fullName || email !== auth.email) {
        setOpenSubmit(false);
      } else {
        setOpenSubmit(true);
      }
    }
  }, [fullName, email]);

  useEffect(() => {
    setErrMessage(false);
    if (password !== "" && rePassword !== "") {
      setSavePassword(false);
    } else {
      setSavePassword(true);
    }
  }, [password, rePassword]);

  const submitHandler = (e) => {
    const config = {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    };
    const body = { fullName, email };
    e.preventDefault();
    setIsWaiting(false);
    axios
      .put(API_URL + "/users", body, config)
      .then((res) => {
        setAuth(res.data);
        setOpenSubmit(true);
        setChangeOpen(true);
        setChangeOpen2(true);
        setIsWaiting(true);
      })
      .catch((err) => {
        setIsWaiting(true);
      });
  };
  const cancelHandler = (e) => {
    e.preventDefault();
    if (!changeOpen || !changeOpen2) {
      setFullName(auth.fullName);
      setEmail(auth.email);
      setChangeOpen(true);
      setChangeOpen2(true);
      setOpenSubmit(true);
    }
  };
  const saveHandler = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    };
    const body = { oldPassword: password, newPassword: rePassword };
    setIsWaiting(false);
    const email2 = auth.email;
    axios
      .put(API_URL + "/users/password", body, config)
      .then((res) => {
        console.log(res);
        const body = { email: email2, password: rePassword };
        axios
          .post(API_URL + "/users/login", body)
          .then((res) => {
            setAuth(res.data);
          })
          .catch((err) => {
            if (err.response.status === 400) {
              setErrMessage(true);
            }
          });
        setErrMessage(false);
        setIsWaiting(true);
      })
      .catch((err) => {
        setErrMessage(true);
        setIsWaiting(true);
      });
  };
  return (
    <div className={styles.editProfile__section}>
      {!isWaiting && <Loading className={"loadingProfile"} />}
      {auth && (
        <>
          <form className={styles.editProfile__form}>
            <h1>Details</h1>
            <div className={styles.editProfile__div}>
              <label htmlFor="fullName">Username</label>
              <div>
                <input
                  disabled={changeOpen}
                  onChange={(e) => {
                    setFullName(e.target.value);
                  }}
                  id="fullName"
                  type="text"
                  value={fullName}
                />
                <i
                  style={changeOpen ? { color: "#939393" } : {}}
                  onClick={() => {
                    setChangeOpen(false);
                  }}
                  className="fa-solid fa-pen"
                ></i>
              </div>
            </div>
            <div className={styles.editProfile__div}>
              <label htmlFor="email">Email</label>
              <div>
                <input
                  disabled={changeOpen2}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  id="email"
                  value={email}
                  type="text"
                />
                <i
                  style={changeOpen2 ? { color: "#939393" } : {}}
                  onClick={() => {
                    setChangeOpen2(false);
                  }}
                  className="fa-solid fa-pen"
                ></i>
              </div>
            </div>
            <div className={styles.editProfile__btn}>
              <button onClick={cancelHandler}>Cancel</button>
              <button
                className={openSubmit ? `${styles.editProfile__submitBtn}` : ""}
                disabled={openSubmit}
                onClick={submitHandler}
              >
                Update Profile
              </button>
            </div>
          </form>
          <form className={styles.editProfile__changePassword}>
            <h1>Change Password</h1>
            <div className={styles.changePassword__div}>
              <label style={errMessage ? { color: "red" } : {}}>
                {errMessage
                  ? "Current password is incorrect"
                  : "Current Password"}
              </label>
              <div>
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
            </div>
            <div className={styles.changePassword__div}>
              <label>New Password</label>
              <div>
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
                    className={
                      openPassword2 ? "ri-eye-line" : "ri-eye-off-line"
                    }
                  ></i>
                )}
              </div>
            </div>
            <button
              className={savePassword ? `${styles.editProfile__saveBtn}` : ""}
              disabled={savePassword}
              onClick={saveHandler}
            >
              Save
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default EditProfile;
