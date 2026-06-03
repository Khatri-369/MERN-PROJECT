import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";

function UserLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default UserLayout;  