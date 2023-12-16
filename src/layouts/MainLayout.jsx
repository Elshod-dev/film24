import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header.jsx";

function MainLayout() {
  return (
    <div className="header__back">
      <Header />
      <Outlet />
    </div>
  );
}

export default MainLayout;
