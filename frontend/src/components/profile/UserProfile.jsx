import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import {
    FaUser,
    FaUserEdit,
    FaShoppingBag,
    FaLock,
    FaSignOutAlt,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaCity,
    FaAddressCard,
    FaInfoCircle
} from "react-icons/fa";
import Header from "../Header/Header";
import './UserProfile.css';

export default function UserProfile() {
    const [userData, setUserData] = useState("");
    const [editData, setEditData] = useState("");
    const [buttonselect, setbuttonselect] = useState("profile");

    useEffect(() => {
        const UserData = async () => {
            try {
                const dataa = await axios.get("http://localhost:8000/user/showoneuser");
                setUserData(dataa.data);
                setEditData(dataa.data);
            } catch (error) {
                console.log("Error in fetching user data:", error);
            }
        }
        UserData();
    }, []);

    const LogoutUser = async () => {
        try {
            const ConfirmLogout = window.confirm("Are You Sure Want To Logout?");

            if (ConfirmLogout) {
                const dataa = await axios.get("http://localhost:8000/user/logoutuser");
                toast.success(dataa.data.message);
            }
        } catch (error) {
            console.log("Error in logout:", error);
        }
    };

    //UPDATE PROFILE
    const handleUpdateProfile = async () => {
        try {
            const UpdateData = await axios.put(`http://localhost:8000/user/updateuser/${userData._id}`, editData);
            toast.success("Profile updated successfully!");
            setUserData(UpdateData.data);
            setbuttonselect("profile");
        } catch (error) {
            console.log("Error in updating profile:", error);
            toast.error("Failed to update profile. Please try again.");
        }
    };

    //HANDLE CHANGE
    const handlechange = (e) => {
        setEditData({
            ...editData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <>
            <Header />
            <div className="profile-page-wrapper">
                <div className="profile-page-container">

                    {/* Breadcrumbs */}
                    <div className="profile-breadcrumbs">
                        <Link to="/homepage">Home</Link>
                        <span>&rsaquo;</span>
                        <span className="current-crumb">Your Profile</span>
                    </div>

                    <div className="profile-dashboard-layout">

                        {/* Left Sidebar */}
                        <div className="profile-sidebar">
                            <div className="profile-sidebar-header">
                                <div className="profile-photo-container">
                                    <img
                                        src={userData.photo ? `http://localhost:8000/uploads/${userData.photo}` : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                                        alt="Profile"
                                    />
                                </div>
                                <h2 className="profile-sidebar-name">
                                    {`${userData.first_name} ${userData.last_name}`}
                                </h2>
                                <span className="profile-sidebar-email">{userData.email_id}</span>
                            </div>

                            <div className="profile-sidebar-menu">
                                <button
                                    className={`menu-item ${buttonselect === "profile" ? "active" : ""}`}
                                    onClick={() => setbuttonselect("profile")}
                                >
                                    <FaUser /> Profile Details
                                </button>
                                <button
                                    className={`menu-item ${buttonselect === "updateprofile" ? "active" : ""}`}
                                    onClick={() => {
                                        setbuttonselect("updateprofile");
                                        setEditData(userData);
                                    }}
                                >
                                    <FaUserEdit /> Update Profile
                                </button>
                                <button
                                    className={`menu-item ${buttonselect === "pastorder" ? "active" : ""}`}
                                    onClick={() => setbuttonselect("pastorder")}
                                >
                                    <FaShoppingBag /> Past Orders
                                </button>
                                <button
                                    className={`menu-item ${buttonselect === "changepassword" ? "active" : ""}`}
                                    onClick={() => setbuttonselect("changepassword")}
                                >
                                    <FaLock /> Change Password
                                </button>
                                <button
                                    className="menu-item logout-btn"
                                    onClick={LogoutUser}
                                >
                                    <FaSignOutAlt /> Logout
                                </button>
                            </div>
                        </div>

                        {/* Right Content Area */}
                        <div className="profile-content-panel">
                            {buttonselect === "profile" && (
                                <>
                                    <h2 className="panel-title"><FaUser /> Profile Details</h2>
                                    <div className="details-grid">
                                        <div className="details-card">
                                            <div className="card-icon-wrapper"><FaUser /></div>
                                            <div className="card-info">
                                                <span className="card-label">Full Name</span>
                                                <span className="card-value">{userData.first_name} {userData.last_name}</span>
                                            </div>
                                        </div>

                                        <div className="details-card">
                                            <div className="card-icon-wrapper"><FaEnvelope /></div>
                                            <div className="card-info">
                                                <span className="card-label">Email Address</span>
                                                <span className="card-value">{userData.email_id}</span>
                                            </div>
                                        </div>

                                        <div className="details-card">
                                            <div className="card-icon-wrapper"><FaPhone /></div>
                                            <div className="card-info">
                                                <span className="card-label">Mobile Number</span>
                                                <span className="card-value">{userData.mobile_no}</span>
                                            </div>
                                        </div>

                                        <div className="details-card">
                                            <div className="card-icon-wrapper"><FaCity /></div>
                                            <div className="card-info">
                                                <span className="card-label">City</span>
                                                <span className="card-value">{userData.city}</span>
                                            </div>
                                        </div>

                                        <div className="details-card">
                                            <div className="card-icon-wrapper"><FaMapMarkerAlt /></div>
                                            <div className="card-info">
                                                <span className="card-label">State</span>
                                                <span className="card-value">{userData.state}</span>
                                            </div>
                                        </div>

                                        <div className="details-card">
                                            <div className="card-icon-wrapper"><FaAddressCard /></div>
                                            <div className="card-info">
                                                <span className="card-label">Pin Code</span>
                                                <span className="card-value">{userData.pin_code}</span>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            {buttonselect === "updateprofile" && (
                                <>
                                    <h2 className="panel-title"><FaUserEdit /> Update Profile</h2>
                                    <div className="mock-form">
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>First Name</label>
                                                <input type="text" value={editData.first_name || ""} onChange={handlechange} name="first_name" />
                                            </div>
                                            <div className="form-group">
                                                <label>Last Name</label>
                                                <input type="text" value={editData.last_name || ""} onChange={handlechange} name="last_name" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Email Address</label>
                                            <input type="email" value={editData.email_id || ""} onChange={handlechange} name="email_id" />
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Mobile Number</label>
                                                <input type="text" value={editData.mobile_no || ""} onChange={handlechange} name="mobile_no" />
                                            </div>
                                            <div className="form-group">
                                                <label>Pin Code</label>
                                                <input type="text" value={editData.pin_code || ""} onChange={handlechange} name="pin_code" />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>City</label>
                                                <input type="text" value={editData.city || ""} onChange={handlechange} name="city" />
                                            </div>
                                            <div className="form-group">
                                                <label>State</label>
                                                <input type="text" value={editData.state || ""} onChange={handlechange} name="state" />
                                            </div>
                                        </div>
                                        <button className="btn-primary-mock" onClick={handleUpdateProfile}>Save Changes</button>
                                    </div>
                                </>
                            )}

                            {buttonselect === "pastorder" && (
                                <>
                                    <h2 className="panel-title"><FaShoppingBag /> Your Orders</h2>
                                    <div className="orders-search-bar">
                                        <input type="text" placeholder="Search all orders..." disabled />
                                        <button disabled>Search</button>
                                    </div>
                                    <div className="empty-state">
                                        <div className="empty-state-icon"><FaShoppingBag /></div>
                                        <h3>No Orders Placed</h3>
                                        <p>You haven't placed any orders in the past 6 months. Go back to browse and find something you like!</p>
                                        <Link to="/homepage" className="btn-primary-mock" style={{ textDecoration: 'none', color: '#111', display: 'inline-block' }}>Go Shopping</Link>
                                    </div>
                                </>
                            )}

                            {buttonselect === "changepassword" && (
                                <>
                                    <h2 className="panel-title"><FaLock /> Change Password</h2>
                                    <div className="form-notice">
                                        <FaInfoCircle /> Password change operations are disabled.
                                    </div>
                                    <div className="mock-form">
                                        <div className="form-group">
                                            <label>Current Password</label>
                                            <input type="password" placeholder="••••••••" disabled />
                                        </div>
                                        <div className="form-group">
                                            <label>New Password</label>
                                            <input type="password" placeholder="••••••••" disabled />
                                        </div>
                                        <div className="form-group">
                                            <label>Confirm New Password</label>
                                            <input type="password" placeholder="••••••••" disabled />
                                        </div>
                                        <button className="btn-primary-mock" disabled style={{ opacity: 0.7, cursor: "not-allowed" }}>Update Password</button>
                                    </div>
                                </>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}