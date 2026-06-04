import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { 
  FaUserEdit, FaCamera, FaUser, FaHistory, FaUserShield, 
  FaEnvelope, FaPhone, FaCalendarAlt, FaCheckCircle, FaExclamationCircle,
  FaShoppingBag, FaMapMarkerAlt, FaChevronDown, FaChevronUp
} from "react-icons/fa";
import "./css/AdminProfile.css";

export default function AdminProfile() {    
  const { id } = useParams();
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [activeTab, setActiveTab] = useState("details"); // 'details', 'photo', 'edit', 'orders'
  
  // States for updating photo
  const [photoUrl, setPhotoUrl] = useState("");
  
  // States for editing profile details
  const [editForm, setEditForm] = useState({
    fullname: "",
    username: "",
    emailid: "",
    mobileno: ""
  });
  
  // States for past orders
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const toggleOrderExpand = (orderId) => {
    setExpandedOrderId(prevId => prevId === orderId ? null : orderId);
  };

  // Fetch admin details
  const fetchAdminDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/admin/showadmin/${id}`);
      setAdmin(response.data);
      setPhotoUrl(response.data.photo || "");
      setEditForm({
        fullname: response.data.fullname || "",
        username: response.data.username || "",
        emailid: response.data.emailid || "",
        mobileno: response.data.mobileno || ""
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to load admin profile");
    }
  };

  // Fetch all orders
  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const response = await axios.get("http://localhost:8000/order/showorder");
      setOrders(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load orders");
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchAdminDetails();
    }
  }, [id]);

  useEffect(() => {
    if (activeTab === "orders") {
      fetchOrders();
    }
  }, [activeTab]);

  // Update Photo URL
  const handleUpdatePhoto = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8000/admin/updateadmin/${id}`,
        { photo: photoUrl }
      );
      setAdmin(response.data);
      toast.success("Profile photo updated successfully!");
      
      // We will reload the page shortly after showing the toast to refresh the sidebar avatar too!
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile photo");
    }
  };

  // Update Admin Details Form
  const handleUpdateDetails = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8000/admin/updateadmin/${id}`,
        editForm
      );
      setAdmin(response.data);
      toast.success("Profile details updated successfully!");
      setActiveTab("details");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || "Failed to update profile details");
    }
  };

  if (!admin) {
    return (
      <div className="profile-loading">
        <div className="spinner"></div>
        <p>Loading Admin Profile...</p>
      </div>
    );
  }

  const defaultAvatar = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150";

  return (
    <div className="profile-page-container">
      {/* Cover / Profile Banner */}
      <div className="profile-cover-banner">
        <div className="cover-overlay"></div>
        <div className="profile-banner-info">
          <div className="banner-avatar-wrap">
            <img 
              src={admin.photo ? (admin.photo.startsWith("http") ? admin.photo : `http://localhost:8000/uploads/${admin.photo}`) : defaultAvatar} 
              alt={admin.fullname} 
              className="banner-avatar" 
              onError={(e) => { e.target.src = defaultAvatar; }}
            />
          </div>
          <div className="banner-text-details">
            <h2>{admin.fullname}</h2>
            <p className="banner-username">@{admin.username}</p>
            <div className="banner-badges">
              <span className="badge badge-admin">
                <FaUserShield /> System Administrator
              </span>
              <span className={`badge ${admin.status === 1 ? "badge-active" : "badge-inactive"}`}>
                {admin.status === 1 ? <FaCheckCircle /> : <FaExclamationCircle />} {admin.status === 1 ? "Active Account" : "Inactive"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Menu Tab Bar */}
      <div className="profile-menu-navbar">
        <button 
          className={`menu-nav-item ${activeTab === "details" ? "active" : ""}`}
          onClick={() => setActiveTab("details")}
        >
          <FaUser className="nav-icon" />
          <span>Personal Details</span>
        </button>

        <button 
          className={`menu-nav-item ${activeTab === "photo" ? "active" : ""}`}
          onClick={() => setActiveTab("photo")}
        >
          <FaCamera className="nav-icon" />
          <span>Update Avatar</span>
        </button>

        <button 
          className={`menu-nav-item ${activeTab === "edit" ? "active" : ""}`}
          onClick={() => setActiveTab("edit")}
        >
          <FaUserEdit className="nav-icon" />
          <span>Edit Profile Info</span>
        </button>

        <button 
          className={`menu-nav-item ${activeTab === "orders" ? "active" : ""}`}
          onClick={() => setActiveTab("orders")}
        >
          <FaHistory className="nav-icon" />
          <span>Past Orders</span>
        </button>
      </div>

      {/* Main Tab Content Area */}
      <div className="profile-content-card">
        {activeTab === "details" && (
          <div className="tab-details-content fade-in-animation">
            <h3>Personal Profile Details</h3>
            <div className="details-grid-container">
              <div className="details-item-card">
                <div className="item-icon-wrap"><FaUser /></div>
                <div className="item-text-wrap">
                  <label>Full Name</label>
                  <span>{admin.fullname}</span>
                </div>
              </div>

              <div className="details-item-card">
                <div className="item-icon-wrap"><FaUserShield /></div>
                <div className="item-text-wrap">
                  <label>Username</label>
                  <span>{admin.username}</span>
                </div>
              </div>

              <div className="details-item-card">
                <div className="item-icon-wrap"><FaEnvelope /></div>
                <div className="item-text-wrap">
                  <label>Email Address</label>
                  <span className="email-span">{admin.emailid}</span>
                </div>
              </div>

              <div className="details-item-card">
                <div className="item-icon-wrap"><FaPhone /></div>
                <div className="item-text-wrap">
                  <label>Mobile Number</label>
                  <span>{admin.mobileno}</span>
                </div>
              </div>

              <div className="details-item-card">
                <div className="item-icon-wrap"><FaCalendarAlt /></div>
                <div className="item-text-wrap">
                  <label>Member Since</label>
                  <span>{new Date(admin.cdate).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              </div>

              <div className="details-item-card">
                <div className="item-icon-wrap">
                  {admin.status === 1 ? <FaCheckCircle className="color-active" /> : <FaExclamationCircle className="color-inactive" />}
                </div>
                <div className="item-text-wrap">
                  <label>Account Status</label>
                  <span className={admin.status === 1 ? "color-active" : "color-inactive"}>
                    {admin.status === 1 ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "photo" && (
          <div className="tab-photo-content fade-in-animation">
            <h3>Update Profile Photo</h3>
            <p className="tab-description">Enter a valid public image URL to update your profile avatar instantly across the system.</p>
            
            <div className="photo-editor-layout">
              <div className="preview-panel">
                <label>Avatar Live Preview</label>
                <img 
                  src={photoUrl ? (photoUrl.startsWith("http") ? photoUrl : `http://localhost:8000/uploads/${photoUrl}`) : defaultAvatar} 
                  alt="Live Preview" 
                  className="live-avatar-preview"
                  onError={(e) => { e.target.src = defaultAvatar; }}
                />
              </div>

              <form onSubmit={handleUpdatePhoto} className="photo-form-control">
                <div className="input-group">
                  <label htmlFor="photo-url-input">New Image URL</label>
                  <input 
                    id="photo-url-input"
                    type="url" 
                    placeholder="https://example.com/your-image.jpg"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-action-buttons">
                  <button type="submit" className="btn btn-save-photo">
                    <FaCamera /> Save Avatar
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-reset-photo"
                    onClick={() => setPhotoUrl(admin.photo || "")}
                  >
                    Reset
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

        {activeTab === "edit" && (
          <div className="tab-edit-content fade-in-animation">
            <h3>Edit Profile Details</h3>
            <p className="tab-description">Modify your personal contact and identity details. All changes are saved instantly.</p>
            
            <form onSubmit={handleUpdateDetails} className="edit-details-form">
              <div className="edit-form-grid">
                <div className="input-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter Full Name"
                    value={editForm.fullname}
                    onChange={(e) => setEditForm({ ...editForm, fullname: e.target.value })}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Username</label>
                  <input 
                    type="text" 
                    placeholder="Enter Username"
                    value={editForm.username}
                    onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    placeholder="Enter Email Address"
                    value={editForm.emailid}
                    onChange={(e) => setEditForm({ ...editForm, emailid: e.target.value })}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Mobile Number</label>
                  <input 
                    type="text" 
                    placeholder="Enter Mobile Number"
                    value={editForm.mobileno}
                    onChange={(e) => setEditForm({ ...editForm, mobileno: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-action-buttons border-top">
                <button type="submit" className="btn btn-save-details">
                  <FaUserEdit /> Update Information
                </button>
                <button 
                  type="button" 
                  className="btn btn-cancel-edit"
                  onClick={() => {
                    setEditForm({
                      fullname: admin.fullname || "",
                      username: admin.username || "",
                      emailid: admin.emailid || "",
                      mobileno: admin.mobileno || ""
                    });
                    setActiveTab("details");
                  }}
                >
                  Cancel
                </button>
              </div>
              
            </form>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="tab-orders-content fade-in-animation">
            <div className="orders-header-bar">
              <h3>System Past Orders Logs</h3>
              <button className="btn-refresh" onClick={fetchOrders}>
                Refresh List
              </button>
            </div>
            
            {loadingOrders ? (
              <div className="orders-loading-state">
                <div className="spinner"></div>
                <p>Loading past system orders...</p>
              </div>
            ) : orders.length > 0 ? (
              <div className="simple-orders-container">
                <div className="orders-table-header">
                  <div className="col-id-date">Order / Date</div>
                  <div className="col-customer">Customer</div>
                  <div className="col-products">Products Summary</div>
                  <div className="col-total">Total</div>
                  <div className="col-status">Status</div>
                  <div className="col-action"></div>
                </div>

                <div className="orders-rows-list">
                  {orders.map((order) => {
                    const isExpanded = expandedOrderId === order._id;
                    const itemsSummary = order.items.map(i => `${i.product} (x${i.quantity})`).join(', ');

                    return (
                      <div key={order._id} className={`order-row-item ${isExpanded ? 'is-expanded' : ''}`}>
                        {/* Main Row summary */}
                        <div className="order-row-main" onClick={() => toggleOrderExpand(order._id)}>
                          <div className="col-id-date">
                            <span className="order-short-id">#{order._id.substring(order._id.length - 8).toUpperCase()}</span>
                            <span className="order-row-date">{new Date(order.ordereddate).toLocaleDateString()}</span>
                          </div>
                          
                          <div className="col-customer">
                            <span className="col-lbl-mobile">Customer:</span>
                            <span className="customer-name-val">{order.user}</span>
                          </div>

                          <div className="col-products" title={itemsSummary}>
                            <span className="col-lbl-mobile">Products:</span>
                            <span className="products-summary-val">{itemsSummary}</span>
                          </div>

                          <div className="col-total">
                            <span className="col-lbl-mobile">Total:</span>
                            <span className="total-amount-val">${order.totalprice.toFixed(2)}</span>
                          </div>

                          <div className="col-status">
                            <span className={`status-pill ${order.orderstatus.toLowerCase()}`}>
                              {order.orderstatus}
                            </span>
                          </div>

                          <div className="col-action">
                            <button className="btn-toggle-row" aria-label="Toggle Details">
                              {isExpanded ? <FaChevronUp className="chevron-icon" /> : <FaChevronDown className="chevron-icon" />}
                            </button>
                          </div>
                        </div>

                        {/* Collapsible details for order item */}
                        {isExpanded && (
                          <div className="order-row-details fade-in-animation">
                            <div className="details-inner-grid">
                              <div className="details-items-section">
                                <h4>Items Breakdown</h4>
                                <div className="items-mini-list">
                                  {order.items.map((item, idx) => (
                                    <div key={idx} className="item-mini-row">
                                      <span className="mini-item-name">{item.product}</span>
                                      <span className="mini-item-qty">Qty: {item.quantity}</span>
                                      <span className="mini-item-price">${item.price.toFixed(2)}</span>
                                      <span className="mini-item-subtotal">${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div className="details-shipping-section">
                                <h4>Delivery Details</h4>
                                <div className="shipping-info-box">
                                  <p><strong>Customer Name:</strong> {order.user}</p>
                                  <p><strong>Shipping Address:</strong> {order.deliveryaddress}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="no-orders-state">
                <FaShoppingBag className="empty-bag-icon" />
                <p>No orders registered in the system database yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
