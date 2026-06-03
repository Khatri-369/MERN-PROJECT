import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";

import "./Userlayout.css";

function UserLayout() {
  return (
    <div className="user-layout-container">
      <Header />
      <Navbar />
      <main className="amazon-main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default UserLayout;