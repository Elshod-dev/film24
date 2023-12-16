import { useState } from "react";
import styles from "./SingleUser.module.css";

function SingleUser({ user, setId, setPopUp }) {
  const [isTrue, setisTrue] = useState(true);

  return (
    <tr className={styles.user__tr}>
      <td>{user.fullName}</td>
      <td>{user.email}</td>
      <td>{user.createdAt.split("T")[0]}</td>
      <td>{user.isAdmin ? "Admin" : "User"}</td>
      <td className={styles.user__more} title="More">
        <i
          onClick={() => {
            setisTrue(!isTrue);
          }}
          className="ri-more-2-fill"
        ></i>
        <div className={!isTrue ? `more show` : `more hide`}>
          <i className="ri-pencil-line"></i>
          <i
            onClick={() => {
              setId(user._id);
              setPopUp(true);
            }}
            className="ri-delete-bin-7-line"
          ></i>
        </div>
      </td>
    </tr>
  );
}

export default SingleUser;
