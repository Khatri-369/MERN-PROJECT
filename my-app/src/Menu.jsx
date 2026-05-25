import React, { useState } from "react";
import "./css/Menu.css";
import { FaChevronDown } from "react-icons/fa";

export default function Menu() {
  const [openMenu, setOpenMenu] = useState("");

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? "" : menu);
  };

  return (
    <div className="sidebar">
      <h2 className="logo">ADMIN PANEL</h2>

      <div className="menu-item">
        <button onClick={() => toggleMenu("create")} className="menu-btn">
          <span>Create</span>
          <FaChevronDown
            className={`arrow ${openMenu === "create" ? "rotate" : ""}`}
          />
        </button>

        {openMenu === "create" && (
          <div className="submenu">
            <button>User</button>
            <button>Product</button>
            <button>Category</button>
            <button>Order</button>
          </div>
        )}
      </div>

      <div className="menu-item">
        <button onClick={() => toggleMenu("manage")} className="menu-btn">
          <span>Manage</span>
          <FaChevronDown
            className={`arrow ${openMenu === "manage" ? "rotate" : ""}`}
          />
        </button>

        {openMenu === "manage" && (
          <div className="submenu">
            <button>Manage Users</button>
            <button>Manage Products</button>
          </div>
        )}
      </div>

      <div className="menu-item">
        <button onClick={() => toggleMenu("show")} className="menu-btn">
          <span>Show</span>
          <FaChevronDown
            className={`arrow ${openMenu === "show" ? "rotate" : ""}`}
          />
        </button>

        {openMenu === "show" && (
          <div className="submenu">
            <button>Show Users</button>
            <button>Show Products</button>
          </div>
        )}
      </div>

      <div className="menu-item">
        <button onClick={() => toggleMenu("search")} className="menu-btn">
          <span>Search</span>
          <FaChevronDown
            className={`arrow ${openMenu === "search" ? "rotate" : ""}`}
          />
        </button>

        {openMenu === "search" && (
          <div className="submenu">
            <button>Search User</button>
            <button>Search Product</button>
          </div>
        )}
      </div>
    </div>
  );
}