import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalProvider.jsx";
import { API_URL } from "../../API/API.jsx";
import axios from "axios";
import Loading from "../Loading/Loading.jsx";
import styles from "./Users.module.css";
import SingleUser from "../SingleUser/SingleUser.jsx";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Users() {
  const { auth, deleteHandler, isDeleted, isRefresh } =
    useContext(GlobalContext);
  const [popUp, setPopUp] = useState(false);
  const [id, setId] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const datas = JSON.parse(localStorage.getItem("datas"));
    const config = {
      headers: {
        Authorization: `Bearer ${datas.token}`,
      },
    };
    setLoading(true);
    axios
      .get(API_URL + "/users", config)
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [auth, isDeleted, isRefresh]);

  return (
    <div className={styles.users__section}>
      {loading && <Loading className={"loadingProfile"} />}
      {!loading && (
        <div className={styles.users__main}>
          <table className={styles.users__table}>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email Address </th>
                <th>Joined</th>
                <th>Permissions</th>
                <th>More</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <SingleUser
                  setPopUp={setPopUp}
                  setId={setId}
                  key={user._id}
                  user={user}
                />
              ))}
            </tbody>
          </table>
          {popUp && (
            <div className={styles.popUp__blur}>
              <div className={styles.popUp}>
                <FontAwesomeIcon icon={faExclamationTriangle} />
                <h2>Delete</h2>
                <span>Are you sure you want to delete this user?</span>
                <div className={styles.popUp__btns}>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setPopUp(false);
                      setId("");
                    }}
                  >
                    No
                  </button>
                  <button
                    onClick={() => {
                      deleteHandler(id);
                      setPopUp(false);
                    }}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Users;
