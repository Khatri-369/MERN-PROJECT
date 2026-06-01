import React, { useState, useEffect } from "react";
import "./css/Menu.css";
import { FaChevronDown, FaUserEdit, FaCamera, FaHistory } from "react-icons/fa";
import { Outlet, useNavigate } from "react-router-dom";
import "./css/Footer.css";
import axios from "axios";
import toast from "react-hot-toast";

export default function Menu() {
  const [openMenu, setOpenMenu] = useState("");
  const navigate = useNavigate();
  const [adminId, setAdminId] = useState("");
  const [adminName, setAdminName] = useState("");
  const[adminphoto,setAdminPhoto]=useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState(false);
  const [newPhotoUrl, setNewPhotoUrl] = useState("");

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? "" : menu);
  };

  useEffect(() => {
    const getAdminData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/admin/adminpanel",
          {
            withCredentials: true,
          }
        );
        setAdminId(response.data.adminId);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch admin data");
      }
    };

    getAdminData();
  }, []);

  useEffect(() => {
    const getUsername = async () => {
      if (!adminId) return;

      try {
        const response = await axios.get(
          `http://localhost:8000/admin/showadmin/${adminId}`
        );

        setAdminName(response.data);
        setAdminPhoto(response.data.photo);
      } catch (error) {
        console.log(error);
      }
    };

    getUsername();
  }, [adminId]);

  const handleUpdatePhoto = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8000/admin/updateadmin/${adminId}`,
        { photo: newPhotoUrl }
      );
      setAdminPhoto(response.data.photo);
      toast.success("Profile photo updated successfully!");
      setEditingPhoto(false);
      setShowProfileMenu(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile photo");
    }
  };

  const logoutAdmin = async () => {
    try {
      await axios.post(
        "http://localhost:8000/admin/logoutadmin"
      );
      toast.success("Logout Successful");
      navigate("/loginadmin");
    } catch (error) {
      toast.error("Logout Failed");
    }
  };

  return (
    <>
      <div className="admin-layout">
        {/* SIDEBAR */}
        <div className="sidebar">
          <div className="admin-profile">
            <div 
              className="avatar-container" 
              onClick={() => navigate(`/adminpanel/adminprofile/${adminId}`)} 
              title="Click to view profile"
            >
              {adminphoto ? (
                <img src={adminphoto} alt="Admin Profile" className="admin-avatar" />
              ) : (
                <div className="admin-avatar-fallback">
                  {adminName.fullname ? adminName.fullname.charAt(0).toUpperCase() : "A"}
                </div>
              )}
            </div>
            <span className="welcome-text">Welcome, {adminName.fullname || "Admin"}</span>
          </div>

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
                <button onClick={() => navigate("/adminpanel/createuser")}>
                  Create User
                </button>

                <button onClick={() => navigate("/adminpanel/createproduct")}>
                  Create Product
                </button>

                <button onClick={() => navigate("/adminpanel/createadmin")}>
                  Create Admin
                </button>

                <button onClick={() => navigate("/adminpanel/createcart")}>
                  Create Cart
                </button>

                <button onClick={() => navigate("/adminpanel/createcategory")}>
                  Create Category
                </button>

                <button onClick={() => navigate("/adminpanel/createvendor")}>
                  Create Vendor
                </button>

                <button onClick={() => navigate("/adminpanel/createorder")}>
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
                <button onClick={() => navigate("/adminpanel/manageuser")}>
                  Manage Users
                </button>

                <button onClick={() => navigate("/adminpanel/manageproduct")}>
                  Manage Products
                </button>

                <button onClick={() => navigate("/adminpanel/manageadmin")}>
                  Manage Admins
                </button>

                <button onClick={() => navigate("/adminpanel/managecart")}>
                  Manage Cart
                </button>

                <button onClick={() => navigate("/adminpanel/managecategory")}>
                  Manage Categories
                </button>

                <button onClick={() => navigate("/adminpanel/managevendor")}>
                  Manage Vendor
                </button>

                <button onClick={() => navigate("/adminpanel/manageorder")}>
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
                <button onClick={() => navigate("/adminpanel/showuser")}>
                  Show Users
                </button>

                <button onClick={() => navigate("/adminpanel/showproduct")}>
                  Show Products
                </button>

                <button onClick={() => navigate("/adminpanel/showadmin")}>
                  Show Admins
                </button>

                <button onClick={() => navigate("/adminpanel/showcart")}>
                  Show Cart
                </button>

                <button onClick={() => navigate("/adminpanel/showcategory")}>
                  Show Categories
                </button>

                <button onClick={() => navigate("/adminpanel/showvendor")}>
                  Show Vendors
                </button>

                <button onClick={() => navigate("/adminpanel/showorder")}>
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
                <button onClick={() => navigate("/adminpanel/searchuser")}>
                  Search User
                </button>

                <button onClick={() => navigate("/adminpanel/searchproduct")}>
                  Search Product
                </button>

                <button onClick={() => navigate("/adminpanel/searchadmin")}>
                  Search Admin
                </button>

                <button onClick={() => navigate("/adminpanel/searchcart")}>
                  Search Cart
                </button>

                <button onClick={() => navigate("/adminpanel/searchcategory")}>
                  Search Category
                </button>

                <button onClick={() => navigate("/adminpanel/searchvendor")}>
                  Search Vendor
                </button>

                <button onClick={() => navigate("/adminpanel/searchorder")}>
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
                <button onClick={() => navigate("/adminpanel/statususer")}>
                  User
                </button>

                <button onClick={() => navigate("/adminpanel/statusadmin")}>
                  Admin
                </button>

              </div>
            )}

            <button
              className="logout-btn"
              onClick={logoutAdmin}
            >
              Logout
            </button>
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