import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header.jsx";
import Cart from "../components/Cart/Cart.jsx";

export function ShowCart() {
  const [cartUpdated, setCartUpdated] = useState(false);

  return (
    <>
      <Header cartUpdated={cartUpdated} />
      <Cart cartUpdated={cartUpdated} setCartUpdated={setCartUpdated} />
      <Outlet />
    </>
  );
};