import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { API_URL } from "../API/API.jsx";

export const GlobalContext = createContext();
function GlobalProvider({ children }) {
  const [auth, setAuth] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isWaiting, setIsWaiting] = useState(true);
  const [isRefresh, setIsRefresh] = useState(false);
  useEffect(() => {
    if (!auth?.email) {
      let datas = JSON.parse(localStorage.getItem("datas"));
      setAuth(datas);
    } else {
      localStorage.setItem("datas", JSON.stringify(auth));
      localStorage.setItem("isShow", JSON.stringify(true));
    }
  }, [auth]);

  const deleteHandler = (id) => {
    const datas = JSON.parse(localStorage.getItem("datas"));
    const config = {
      headers: {
        Authorization: `Bearer ${datas.token}`,
      },
    };
    axios
      .delete(API_URL + "/users" + `/${id}`, config)
      .then((res) => {
        setIsDeleted(!isDeleted);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <GlobalContext.Provider
      value={{
        auth,
        setAuth,
        isWaiting,
        setIsWaiting,
        deleteHandler,
        isDeleted,
        isRefresh,
        setIsRefresh,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalProvider;
