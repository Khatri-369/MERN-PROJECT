import React, { useState } from "react";
import "./css/Menu.css";
import { FaChevronDown } from "react-icons/fa";
import { Outlet, useNavigate } from "react-router-dom";
import "./css/Footer.css";

export default function Menu() {
  const [openMenu, setOpenMenu] = useState("");
  const navigate = useNavigate();

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? "" : menu);
  };

  return (
    <>
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

              <button onClick={() => navigate("/createcart")}>
                Create Cart
              </button>

              <button onClick={() => navigate("/createcategory")}>
                Create Category
              </button>

              <button onClick={() => navigate("/createvendor")}>
                Create Vendor
              </button>

              <button onClick={() => navigate("/createorder")}>
                Create Order
              </button>
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

              <button onClick={() => navigate("/managecart")}>
                Manage Cart
              </button>

              <button onClick={() => navigate("/managecategory")}>
                Manage Categories
              </button>

              <button onClick={() => navigate("/managevendor")}>
                Manage Vendor
              </button>

              <button onClick={() => navigate("/manageorder")}>
                Manage Orders
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

              <button onClick={() => navigate("/showcart")}>
                Show Cart
              </button>

              <button onClick={() => navigate("/showcategory")}>
                Show Categories
              </button>

              <button onClick={() => navigate("/showvendor")}>
                Show Vendors
              </button>

              <button onClick={() => navigate("/showorder")}>
                Show Orders
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

              <button onClick={() => navigate("/searchcart")}>
                Search Cart
              </button>

              <button onClick={() => navigate("/searchcategory")}>
                Search Category
              </button>

              <button onClick={() => navigate("/searchvendor")}>
                Search Vendor
              </button>

              <button onClick={() => navigate("/searchorder")}>
                Search Order
              </button>
            </div>
          )}
          </div>
          {/* SEARCH */}
          <div className="menu-item">
             <button onClick={() => toggleMenu("status")} className="menu-btn">
            <span>STATUS</span>
            <FaChevronDown
              className={`arrow ${openMenu === "status" ? "rotate" : ""}`}
            />
          </button>

          {openMenu === "status" && (
            <div className="submenu">
              <button onClick={() => navigate("/statususer")}>
                User
              </button>

              <button onClick={() => navigate("/statusadmin")}>
                Admin
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

<footer className="footer">
  <div className="footer-bottom">
    <h2>AMAZON</h2>
    <p>© 2026 All Rights Reserved | Designed by Khatri Om Kumar</p>
  </div>
</footer>
    </>
  );
}