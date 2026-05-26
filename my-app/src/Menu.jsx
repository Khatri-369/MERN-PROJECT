import React, { useState } from "react";
import "./css/Menu.css";
import { FaChevronDown } from "react-icons/fa";
import { Outlet, useNavigate } from "react-router-dom";

export default function Menu() {
  const [openMenu, setOpenMenu] = useState("");
  const navigate = useNavigate();

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? "" : menu);
  };

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <div className="sidebar">
        <h2 className="logo">ADMIN PANEL</h2>

        {/* CREATE */}
        <div className="menu-item">
          <button onClick={() => toggleMenu("create")} className="menu-btn">
            <span>Create</span>
            <FaChevronDown
              className={`arrow ${openMenu === "create" ? "rotate" : ""}`}
            />
          </button>

          {openMenu === "create" && (
            <div className="submenu">
              <button onClick={() => navigate("/createuser")}>
                Create User
              </button>

              <button onClick={() => navigate("/createproduct")}>
                Create Product
              </button>

              <button onClick={() => navigate("/createadmin")}>
                Create Admin
              </button>

              <button>Category</button>
              <button>Order</button>
            </div>
          )}
        </div>

        {/* MANAGE */}
        <div className="menu-item">
          <button onClick={() => toggleMenu("manage")} className="menu-btn">
            <span>Manage</span>
            <FaChevronDown
              className={`arrow ${openMenu === "manage" ? "rotate" : ""}`}
            />
          </button>

          {openMenu === "manage" && (
            <div className="submenu">
              <button onClick={() => navigate("/manageuser")}>
                Manage Users
              </button>

              <button onClick={() => navigate("/manageproduct")}>
                Manage Products
              </button>

              <button onClick={() => navigate("/manageadmin")}>
                Manage Admins
              </button>
            </div>
          )}
        </div>

        {/* SHOW */}
        <div className="menu-item">
          <button onClick={() => toggleMenu("show")} className="menu-btn">
            <span>Show</span>
            <FaChevronDown
              className={`arrow ${openMenu === "show" ? "rotate" : ""}`}
            />
          </button>

          {openMenu === "show" && (
            <div className="submenu">
              <button onClick={() => navigate("/showuser")}>
                Show Users
              </button>

              <button onClick={() => navigate("/showproduct")}>
                Show Products
              </button>

              <button onClick={() => navigate("/showadmin")}>
                Show Admins
              </button>
            </div>
          )}
        </div>

        {/* SEARCH */}
        <div className="menu-item">
          <button onClick={() => toggleMenu("search")} className="menu-btn">
            <span>Search</span>
            <FaChevronDown
              className={`arrow ${openMenu === "search" ? "rotate" : ""}`}
            />
          </button>

          {openMenu === "search" && (
            <div className="submenu">
              <button onClick={() => navigate("/searchuser")}>
                Search User
              </button>

              <button onClick={() => navigate("/searchproduct")}>
                Search Product
              </button>

              <button onClick={() => navigate("/searchadmin")}>
                Search Admin
              </button>
            </div>
          )}
        </div>
      </div>

      {/* CONTENT */}
      <div className="content-area">
        <Outlet />
      </div>
    </div>
  );
}