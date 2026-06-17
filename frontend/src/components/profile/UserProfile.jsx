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

function OrderDeliveryMap({ latitude, longitude, address, items, orderstatus }) {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);
    const [shopCoords, setShopCoords] = useState(null);
    const [shopInfo, setShopInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const locateShop = async () => {
            const shop = items?.find(item => item.shopId && typeof item.shopId === 'object')?.shopId;
            
            if (!shop) {
                if (isMounted) {
                    setShopInfo({ name: "Partner Shop", address: "Standard Shop Location" });
                    setShopCoords({ lat: latitude + 0.006, lon: longitude - 0.008 });
                    setLoading(false);
                }
                return;
            }

            setShopInfo(shop);
            
            const searchStr = `${shop.name || ""}, ${shop.address || ""}, ${shop.city || ""}, ${shop.pincode || ""}`;
            try {
                const res = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchStr)}`);
                if (res.data && res.data.length > 0 && isMounted) {
                    setShopCoords({
                        lat: Number(res.data[0].lat),
                        lon: Number(res.data[0].lon)
                    });
                    setLoading(false);
                    return;
                }
            } catch (err) {
                console.error("Shop geocoding failed, trying fallback search", err);
            }

            // Try fallback search with just city and pincode
            const fallbackStr = `${shop.city || ""}, ${shop.pincode || ""}`;
            try {
                const res = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fallbackStr)}`);
                if (res.data && res.data.length > 0 && isMounted) {
                    setShopCoords({
                        lat: Number(res.data[0].lat),
                        lon: Number(res.data[0].lon)
                    });
                    setLoading(false);
                    return;
                }
            } catch (err) {
                console.error("Shop fallback geocoding failed", err);
            }

            // Absolute fallback
            if (isMounted) {
                setShopCoords({ lat: latitude + 0.006, lon: longitude - 0.008 });
                setLoading(false);
            }
        };

        locateShop();
        return () => {
            isMounted = false;
        };
    }, [items, latitude, longitude]);

    useEffect(() => {
        if (!mapRef.current || !shopCoords) return;
        
        const shopLat = shopCoords.lat;
        const shopLng = shopCoords.lon;
        const customerLat = latitude;
        const customerLng = longitude;
        
        let t = 0;
        switch (orderstatus) {
            case "Order Placed": t = 0.02; break;
            case "Order Confirmed": t = 0.12; break;
            case "Processing / Packed": t = 0.25; break;
            case "Shipped": t = 0.5; break;
            case "In Transit": t = 0.7; break;
            case "Out for Delivery": t = 0.88; break;
            case "Delivered": t = 1.0; break;
            default: t = 0.02;
        }
        
        const riderLat = shopLat + (customerLat - shopLat) * t;
        const riderLng = shopLng + (customerLng - shopLng) * t;
        
        const map = L.map(mapRef.current, {
            zoomControl: true,
            attributionControl: false
        });
        mapInstance.current = map;

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

        const shopIconHtml = `
            <div class="map-marker-pin shop-pin">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
            </div>
        `;
        
        const riderIconHtml = `
            <div class="map-marker-pin rider-pin">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="1" y="3" width="15" height="13"></rect>
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                    <circle cx="5.5" cy="18.5" r="2.5"></circle>
                    <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
            </div>
        `;
        
        const customerIconHtml = `
            <div class="map-marker-pin customer-pin">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
            </div>
        `;

        const shopIcon = L.divIcon({
            html: shopIconHtml,
            className: 'custom-map-marker',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });

        const riderIcon = L.divIcon({
            html: riderIconHtml,
            className: 'custom-map-marker',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });

        const customerIcon = L.divIcon({
            html: customerIconHtml,
            className: 'custom-map-marker',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });

        // Add Shop Marker
        const shopMarker = L.marker([shopLat, shopLng], { icon: shopIcon }).addTo(map);
        shopMarker.bindPopup(`<strong>Shop:</strong> ${shopInfo?.name || "Merchant Store"}<br/>${shopInfo?.address || ""}`);

        // Add Customer Marker
        const customerMarker = L.marker([customerLat, customerLng], { icon: customerIcon }).addTo(map);
        customerMarker.bindPopup(`<strong>Delivery Address:</strong><br/>${address}`);

        // Add Rider Marker if order not fully delivered
        let riderMarker = null;
        if (t > 0 && t < 1) {
            riderMarker = L.marker([riderLat, riderLng], { icon: riderIcon }).addTo(map);
            riderMarker.bindPopup(`<strong>Delivery Partner</strong><br/>Status: ${orderstatus}`);
        }

        // Draw Polylines
        // Faint background line showing full route
        L.polyline([[shopLat, shopLng], [customerLat, customerLng]], {
            color: '#cbd5e1',
            weight: 3,
            opacity: 0.6,
            dashArray: '5, 5'
        }).addTo(map);

        // Shop to Rider line (Leg 1)
        L.polyline([[shopLat, shopLng], [riderLat, riderLng]], {
            color: '#e47911', // Amazon Dark Orange
            weight: 4,
            opacity: 0.85
        }).addTo(map);

        // Rider to Customer line (Leg 2)
        L.polyline([[riderLat, riderLng], [customerLat, customerLng]], {
            color: '#007185', // Amazon Blue
            weight: 4,
            opacity: 0.85,
            dashArray: '4, 6'
        }).addTo(map);

        // Fit bounds
        const bounds = L.latLngBounds([[customerLat, customerLng], [shopLat, shopLng]]);
        map.fitBounds(bounds, { padding: [40, 40] });

        return () => {
            if (mapInstance.current) {
                mapInstance.current.remove();
                mapInstance.current = null;
            }
        };
    }, [latitude, longitude, shopCoords, orderstatus, address, shopInfo]);

    return (
        <div className="order-map-wrapper" style={{ marginTop: '10px' }}>
            {loading ? (
                <div style={{ height: "200px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f3f4f6", borderRadius: "8px", border: "1px solid #ccc", fontSize: "13px", color: "#666" }}>
                    Locating delivery routes...
                </div>
            ) : (
                <div ref={mapRef} className="order-mini-map" style={{ height: "200px", borderRadius: "8px", border: "1px solid #ccc", zIndex: 10 }}></div>
            )}
            <div className="order-map-actions" style={{ marginTop: '6px' }}>
                <a 
                    href={`https://www.google.com/maps/dir/?api=1&origin=${shopCoords ? `${shopCoords.lat},${shopCoords.lon}` : ""}&destination=${latitude},${longitude}`} 
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
                    Directions on Google Maps
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
                                                                items={order.items}
                                                                orderstatus={order.orderstatus}
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