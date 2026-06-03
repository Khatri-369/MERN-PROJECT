import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import Body from "../components/Body/Body.jsx";

function UserLayout() {
  const [cartUpdated, setCartUpdated] = useState(false);

  return (
    <>
      <Header cartUpdated={cartUpdated} />
      <Body setCartUpdated={setCartUpdated} />
      <Outlet />
    </>
  );
}

export default UserLayout;  