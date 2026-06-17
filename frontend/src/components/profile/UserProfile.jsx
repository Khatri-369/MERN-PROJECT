import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

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
    FaInfoCircle,
    FaCamera,
    FaUpload
} from "react-icons/fa";
import Header from "../Header/Header";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import './UserProfile.css';

// Fix default marker icon issue with Leaflet in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const STATUS_STEPS = [
  { name: "Order Placed", label: "Order Placed 🛒", desc: "Your order has been placed successfully." },
  { name: "Order Confirmed", label: "Order Confirmed ✅", desc: "The seller confirms that the order has been received." },
  { name: "Processing / Packed", label: "Processing / Packed 📦", desc: "The warehouse picks the item and packs it." },
  { name: "Shipped", label: "Shipped 🚚", desc: "The package is handed over to the courier service." },
  { name: "In Transit", label: "In Transit 🚛", desc: "The courier is transporting the package between facilities." },
  { name: "Out for Delivery", label: "Out for Delivery 🏠", desc: "The package is with the delivery agent and will likely arrive today." },
  { name: "Delivered", label: "Delivered 🎉", desc: "The package has been successfully delivered." }
];

const getStatusClass = (status) => {
  if (!status || status === "Pending") return 'order-placed';
  return status.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

function OrderDeliveryMap({ latitude, longitude, address }) {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);

    useEffect(() => {
        if (!mapRef.current) return;
        
        const map = L.map(mapRef.current, {
            zoomControl: true,
            attributionControl: false
        }).setView([latitude, longitude], 14);
        mapInstance.current = map;

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

        L.marker([latitude, longitude]).addTo(map);

        return () => {
            if (mapInstance.current) {
                mapInstance.current.remove();
                mapInstance.current = null;
            }
        };
    }, [latitude, longitude]);

    return (
        <div className="order-map-wrapper" style={{ marginTop: '10px' }}>
            <div ref={mapRef} className="order-mini-map" style={{ height: "200px", borderRadius: "8px", border: "1px solid #ccc", zIndex: 10 }}></div>
            <div className="order-map-actions" style={{ marginTop: '6px' }}>
                <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="google-maps-link"
                    style={{
                        fontSize: '12px',
                        color: '#007185',
                        textDecoration: 'none',
                        fontWeight: '600'
                    }}
                >
                    Open in Google Maps
                </a>
            </div>
        </div>
    );
}

export default function UserProfile() {

    const Navigate = useNavigate();

    const [userData, setUserData] = useState("");
    const [editData, setEditData] = useState("");
    const [buttonselect, setbuttonselect] = useState("profile");
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [orders, setOrders] = useState([]);
    const [ordersLoading, setOrdersLoading] = useState(false);
    const [visibleMaps, setVisibleMaps] = useState({});
    const [visibleTrackers, setVisibleTrackers] = useState({});

    const toggleMap = (orderId) => {
        setVisibleMaps(prev => ({
            ...prev,
            [orderId]: !prev[orderId]
        }));
    };

    const toggleTracker = (orderId) => {
        setVisibleTrackers(prev => ({
            ...prev,
            [orderId]: !prev[orderId]
        }));
    };

    useEffect(() => {
        setSelectedFile(null);
        setPreviewUrl("");
    }, [buttonselect]);

    useEffect(() => {
        if (buttonselect === "pastorder") {
            const fetchOrders = async () => {
                setOrdersLoading(true);
                try {
                    const response = await axios.get("http://localhost:8000/order/showorder");
                    setOrders(response.data);
                } catch (error) {
                    console.log("Error fetching orders:", error);
                    toast.error("Failed to load orders");
                } finally {
                    setOrdersLoading(false);
                }
            };
            fetchOrders();
        }
    }, [buttonselect]);

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
                const dataa = await axios.post("http://localhost:8000/user/logoutuser");
                toast.success("LOGOUT SUCCESSFULLY");
                Navigate("/loginuser");
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

    //Handle File Change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    //Handle Upload
    const handleupload = async () => {
        if (!selectedFile) {
            toast.error("Please choose a file first!");
            return;
        }
        try {
            const formData = new FormData(); //FormData is used for sending files to the server
            formData.append('photo', selectedFile);
            const dataa = await axios.put(`http://localhost:8000/user/updateuser/${userData._id}`, formData);
            toast.success("Profile photo updated successfully!");
            setUserData(dataa.data);
            setSelectedFile(null);
            setPreviewUrl("");
            setbuttonselect("profile");
        }
        catch (error) {
            console.log("Error in updating profile photo:", error);
            toast.error("Failed to update profile photo. Please try again.");
        }
    };

    //HANDLE CHANGE PASSWORD
    const ChangePassword = async (e) => {
        try {
            e.preventDefault();
            const oldpassword = document.getElementById("oldpassword").value;
            const newpassword = document.getElementById("newpassword").value;
            const confirmnewpassword = document.getElementById("confirmnewpassword").value;
            const dataa = await axios.put("http://localhost:8000/user/changepassword", {
                oldpassword,
                newpassword,
                confirmnewpassword
            });
            toast.success(dataa.data.message);
            setbuttonselect("profile");
        }
        catch (error) {
            console.log("Error in changing password:", error);
            toast.error(error.response?.data?.message || "Failed to change password. Please try again.");
        }
    }

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
                                    <div className="update-profile-layout">
                                        <div className="leftside">
                                            <div className="mock-form">
                                                <div className="form-row">
                                                    <div className="form-group">
                                                        <label>First Name</label>
                                                        <input type="text" value={editData.first_name || ""} onChange={handlechange} name="first_name" placeholder="John" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Last Name</label>
                                                        <input type="text" value={editData.last_name || ""} onChange={handlechange} name="last_name" placeholder="Doe" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label>Email Address</label>
                                                    <input type="email" value={editData.email_id || ""} onChange={handlechange} name="email_id" placeholder="john.doe@example.com" />
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group">
                                                        <label>Mobile Number</label>
                                                        <input type="text" value={editData.mobile_no || ""} onChange={handlechange} name="mobile_no" placeholder="1234567890" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Pin Code</label>
                                                        <input type="text" value={editData.pin_code || ""} onChange={handlechange} name="pin_code" placeholder="123456" />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group">
                                                        <label>City</label>
                                                        <input type="text" value={editData.city || ""} onChange={handlechange} name="city" placeholder="City" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>State</label>
                                                        <input type="text" value={editData.state || ""} onChange={handlechange} name="state" placeholder="State" />
                                                    </div>
                                                </div>
                                                <button className="btn-primary-mock" onClick={handleUpdateProfile}>Save Changes</button>
                                            </div>
                                        </div>
                                        <div className="rightside">
                                            <h3>Profile Picture</h3>
                                            <div className="update-photo-container">
                                                <img
                                                    src={previewUrl || (userData.photo ? `http://localhost:8000/uploads/${userData.photo}` : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png")}
                                                    alt="Profile Preview"
                                                />
                                                <label htmlFor="file-upload" className="photo-upload-overlay">
                                                    <FaCamera />
                                                    <span>Change Photo</span>
                                                </label>
                                            </div>
                                            <div className="file-upload-wrapper">
                                                <input id="file-upload" type="file" className="file-upload-input" onChange={handleFileChange} />
                                                <label htmlFor="file-upload" className="file-upload-label">
                                                    <FaUpload /> Choose Image File
                                                </label>
                                                {selectedFile && <span className="selected-file-name">{selectedFile.name}</span>}
                                                <div className="photo-upload-actions">
                                                    <button className="btn-upload-submit" onClick={handleupload}>Upload</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            {buttonselect === "pastorder" && (
                                <>
                                    <h2 className="panel-title"><FaShoppingBag /> Your Orders</h2>
                                    {ordersLoading ? (
                                        <div className="orders-loading">Loading your orders...</div>
                                    ) : orders.length > 0 ? (
                                        <div className="orders-list">
                                            {orders.map((order) => (
                                                <div className="order-card" key={order._id}>
                                                    <div className="order-card-header">
                                                        <div className="order-header-info">
                                                            <div>
                                                                <span className="order-header-label">Order Placed</span>
                                                                <span className="order-header-value">
                                                                    {new Date(order.ordereddate).toLocaleDateString("en-IN", {
                                                                        year: 'numeric',
                                                                        month: 'long',
                                                                        day: 'numeric'
                                                                    })}
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <span className="order-header-label">Total Price</span>
                                                                <span className="order-header-value">₹{order.totalprice}</span>
                                                            </div>
                                                            <div>
                                                                <span className="order-header-label">Status</span>
                                                                <span className={`order-status-badge ${getStatusClass(order.orderstatus)}`}>
                                                                    {order.orderstatus || 'Order Placed'}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="order-card-body">
                                                        <div className="order-items-container">
                                                            {order.items?.map((item, index) => (
                                                                <div className="order-item-row" key={index}>
                                                                    <div>
                                                                        <span className="order-item-name">{item.product}</span>
                                                                        <span className="order-item-qty">x {item.quantity}</span>
                                                                    </div>
                                                                    <span className="order-item-price">₹{item.price * item.quantity}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div className="order-delivery-address">
                                                            <span className="order-header-label" style={{ display: 'block', marginBottom: '6px' }}>Delivery Address</span>
                                                            <p>{order.deliveryaddress}</p>
                                                        </div>
                                                        
                                                        <div className="order-actions-section" style={{ marginTop: '12px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                                            <button 
                                                                className="btn-track-toggle"
                                                                onClick={() => toggleTracker(order._id)}
                                                                style={{
                                                                    background: '#f0f2f2',
                                                                    border: '1px solid #d5d9d9',
                                                                    borderRadius: '8px',
                                                                    padding: '6px 12px',
                                                                    fontSize: '12px',
                                                                    fontWeight: '500',
                                                                    cursor: 'pointer',
                                                                    display: 'inline-flex',
                                                                    alignItems: 'center',
                                                                    gap: '4px',
                                                                    color: '#0f1111'
                                                                }}
                                                            >
                                                                <FaShoppingBag style={{ color: '#e47911' }} /> 
                                                                {visibleTrackers[order._id] ? "Hide Tracker" : "Track Package 📦"}
                                                            </button>

                                                            {order.latitude && order.longitude && (
                                                                <button 
                                                                    className="btn-map-toggle"
                                                                    onClick={() => toggleMap(order._id)}
                                                                    style={{
                                                                        background: '#f0f2f2',
                                                                        border: '1px solid #d5d9d9',
                                                                        borderRadius: '8px',
                                                                        padding: '6px 12px',
                                                                        fontSize: '12px',
                                                                        fontWeight: '500',
                                                                        cursor: 'pointer',
                                                                        display: 'inline-flex',
                                                                        alignItems: 'center',
                                                                        gap: '4px',
                                                                        color: '#0f1111'
                                                                    }}
                                                                >
                                                                    <FaMapMarkerAlt style={{ color: '#e47911' }} /> 
                                                                    {visibleMaps[order._id] ? "Hide Delivery Map" : "Show Delivery Map"}
                                                                </button>
                                                            )}
                                                        </div>

                                                        {visibleTrackers[order._id] && (
                                                            <div className="order-tracker-section fade-in-animation">
                                                                <div className="order-tracker-timeline">
                                                                    {STATUS_STEPS.map((step, idx) => {
                                                                        const normalizedStatus = order.orderstatus === "Pending" ? "Order Placed" : (order.orderstatus || "Order Placed");
                                                                        const orderStatusSteps = STATUS_STEPS.map(s => s.name);
                                                                        const currentStepIndex = orderStatusSteps.indexOf(normalizedStatus) !== -1 ? orderStatusSteps.indexOf(normalizedStatus) : 0;
                                                                        
                                                                        const isCompleted = idx < currentStepIndex;
                                                                        const isActive = idx === currentStepIndex;
                                                                        const isPending = idx > currentStepIndex;

                                                                        return (
                                                                            <div key={idx} className={`tracker-step ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''} ${isPending ? 'pending' : ''}`}>
                                                                                <div className="tracker-icon-container">
                                                                                    <span className="tracker-dot"></span>
                                                                                    {idx < 7 - 1 && <div className="tracker-line"></div>}
                                                                                </div>
                                                                                <div className="tracker-content">
                                                                                    <div className="tracker-title">{step.label}</div>
                                                                                    <div className="tracker-desc">{step.desc}</div>
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {visibleMaps[order._id] && order.latitude && order.longitude && (
                                                            <OrderDeliveryMap 
                                                                latitude={order.latitude} 
                                                                longitude={order.longitude} 
                                                                address={order.deliveryaddress} 
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="empty-state">
                                            <div className="empty-state-icon"><FaShoppingBag /></div>
                                            <h3>No Orders Placed</h3>
                                            <p>You haven't placed any orders yet. Go back to browse and find something you like!</p>
                                            <Link to="/homepage" className="btn-primary-mock" style={{ textDecoration: 'none', color: '#111', display: 'inline-block' }}>Go Shopping</Link>
                                        </div>
                                    )}
                                </>
                            )}

                            {buttonselect === "changepassword" && (
                                <>
                                    <h2 className="panel-title"><FaLock /> Change Password</h2>
                                    <div className="mock-form">
                                        <div className="form-group">
                                            <label>Current Password</label>
                                            <input type="password" name="oldpassword" id="oldpassword" />
                                        </div>
                                        <div className="form-group">
                                            <label>New Password</label>
                                            <input type="password" name="newpassword" id="newpassword" />
                                        </div>
                                        <div className="form-group">
                                            <label>Confirm New Password</label>
                                            <input type="password" name="confirmnewpassword" id="confirmnewpassword" />
                                        </div>
                                        <button className="btn-primary-mock" onClick={ChangePassword}>Update Password</button>
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