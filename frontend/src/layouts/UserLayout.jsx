import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import Body from "../components/Body/Body.jsx";

function UserLayout() {
  return (
    <>
      <Header />
      <Body />
      <Outlet />
    </>
  );
}

export default UserLayout;  