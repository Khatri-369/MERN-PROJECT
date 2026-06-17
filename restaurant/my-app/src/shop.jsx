import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Enable credentials for cookies globally in this file
axios.defaults.withCredentials = true;

const ShopDashboard = () => {
    const navigate = useNavigate();
    const [shop, setShop] = useState(null);
    const [activeTab, setActiveTab] = useState("overview");
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    
    // File upload state
    const [productphotos, setProductphotos] = useState([]);

    // New Product form state
    const [newProduct, setNewProduct] = useState({
        productname: "",
        modelnumber: "",
        modelyear: "",
        price: "",
        brandname: "",
        categoryname: "",
        color: "",
        weight: "",
        includedcomponent: "",
        warranty: ""
    });

    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        fetchShopProfile();
    }, []);

    const fetchShopProfile = async () => {
        try {
            const response = await axios.get("http://localhost:8001/shop/me");
            setShop(response.data.shop);
            fetchOrders();
            fetchProducts();
        } catch (err) {
            console.error("Auth check failed:", err);
            // Fallback to localStorage if cookie-parser session isn't available
            const stored = localStorage.getItem("shopInfo");
            if (stored) {
                setShop(JSON.parse(stored));
                fetchOrders();
                fetchProducts();
            } else {
                navigate("/login");
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchOrders = async () => {
        try {
            const response = await axios.get("http://localhost:8001/order");
            setOrders(response.data.orders || []);
        } catch (err) {
            console.error("Error fetching orders:", err);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:8001/product");
            setProducts(response.data.products || []);
        } catch (err) {
            console.error("Error fetching products:", err);
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:8001/shop/logout");
        } catch (err) {
            console.error("Logout error on backend:", err);
        } finally {
            localStorage.removeItem("shopInfo");
            navigate("/login");
        }
    };

    const handleProductChange = (e) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    };

    const handleAddProductSubmit = async (e) => {
        e.preventDefault();
        setActionLoading(true);
        setError("");
        setSuccess("");

        const formData = new FormData();
        formData.append("productname", newProduct.productname);
        formData.append("modelnumber", newProduct.modelnumber);
        formData.append("modelyear", newProduct.modelyear);
        formData.append("price", newProduct.price);
        formData.append("brandname", newProduct.brandname);
        formData.append("categoryname", newProduct.categoryname);
        formData.append("color", newProduct.color);
        formData.append("weight", newProduct.weight);
        formData.append("includedcomponent", newProduct.includedcomponent);
        formData.append("warranty", newProduct.warranty);

        productphotos.forEach(file => {
            formData.append("productphoto", file);
        });

        try {
            const response = await axios.post("http://localhost:8001/product/add", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            setSuccess(response.data.message || "Product added to catalog!");
            setNewProduct({
                productname: "",
                modelnumber: "",
                modelyear: "",
                price: "",
                brandname: "",
                categoryname: "",
                color: "",
                weight: "",
                includedcomponent: "",
                warranty: ""
            });
            setProductphotos([]);
            
            const fileInput = document.getElementById("productphoto-input");
            if (fileInput) fileInput.value = "";

            fetchProducts();
            setTimeout(() => {
                setActiveTab("products");
                setSuccess("");
            }, 1200);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add product. Please check required fields.");
        } finally {
            setActionLoading(false);
        }
    };

    const handleDeleteProduct = async (productId) => {
        if (!window.confirm("Are you sure you want to delete this product from your catalog?")) return;

        try {
            await axios.delete(`http://localhost:8001/product/${productId}`);
            fetchProducts();
        } catch (err) {
            console.error("Failed to delete product:", err);
            alert("Error deleting product");
        }
    };

    const handleSimulateOrder = async () => {
        setActionLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await axios.post("http://localhost:8001/order/simulate");
            setSuccess(response.data.message || "New order simulated!");
            fetchOrders(); 
            setTimeout(() => {
                setSuccess("");
            }, 3000);
        } catch (err) {
            setError("Failed to simulate order. Make sure backend is running.");
        } finally {
            setActionLoading(false);
        }
    };

    const handleUpdateStatus = async (orderId, newStatus) => {
        try {
            await axios.put(`http://localhost:8001/order/status/${orderId}`, { status: newStatus });
            fetchOrders(); 
        } catch (err) {
            console.error("Failed to update status:", err);
            alert("Error updating order status");
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Order Placed":
            case "Pending":
                return { color: "#fbbf24", border: "#f59e0b" };
            case "Order Confirmed":
                return { color: "#34d399", border: "#10b981" };
            case "Processing / Packed":
                return { color: "#c084fc", border: "#a855f7" };
            case "Shipped":
                return { color: "#60a5fa", border: "#3b82f6" };
            case "In Transit":
                return { color: "#2dd4bf", border: "#0d9488" };
            case "Out for Delivery":
                return { color: "#fb923c", border: "#ea580c" };
            case "Delivered":
                return { color: "#34d399", border: "#059669" };
            default:
                return { color: "#f87171", border: "#ef4444" };
        }
    };

    // Helper to resolve product image from the shared folder
    const getProductImage = (photoArray) => {
        if (!photoArray || photoArray.length === 0) return "";
        const photo = photoArray[0];
        if (photo.startsWith("http")) {
            // Rewrite localhost:8000 to localhost:8001 if accessing via seller portal
            return photo.replace("localhost:8000", "localhost:8001");
        }
        return `http://localhost:8001/uploads/${photo}`;
    };

    // Analytics calculations
    const totalSales = orders
        .filter(o => o.orderstatus === "Delivered")
        .reduce((acc, curr) => acc + curr.totalprice, 0);

    const totalItemsSold = orders
        .filter(o => o.orderstatus === "Delivered")
        .reduce((acc, order) => acc + order.items.reduce((sum, item) => sum + item.quantity, 0), 0);

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.spinner}></div>
                <p style={{ marginTop: "15px", color: "var(--text-secondary)" }}>Loading Shop Dashboard...</p>
            </div>
        );
    }

    return (
        <div style={styles.dashboardLayout}>
            {/* Sidebar Navigation */}
            <aside style={styles.sidebar}>
                <div style={styles.brand}>
                    <div style={styles.brandIcon}>📦</div>
                    <div>
                        <h2 style={styles.brandName}>{shop?.name || "Shop Panel"}</h2>
                        <span style={styles.brandStatus}>Seller Portal</span>
                    </div>
                </div>

                <nav style={styles.navMenu}>
                    <button
                        onClick={() => setActiveTab("overview")}
                        style={{ ...styles.navItem, ...(activeTab === "overview" ? styles.navItemActive : {}) }}
                    >
                        📊 Overview
                    </button>
                    <button
                        onClick={() => setActiveTab("orders")}
                        style={{ ...styles.navItem, ...(activeTab === "orders" ? styles.navItemActive : {}) }}
                    >
                        🛒 Manage Orders
                    </button>
                    <button
                        onClick={() => setActiveTab("products")}
                        style={{ ...styles.navItem, ...(activeTab === "products" ? styles.navItemActive : {}) }}
                    >
                        🎒 My Products
                    </button>
                    <button
                        onClick={() => setActiveTab("addproduct")}
                        style={{ ...styles.navItem, ...(activeTab === "addproduct" ? styles.navItemActive : {}) }}
                    >
                        ➕ Add Product
                    </button>
                </nav>

                <div style={styles.sidebarFooter}>
                    <button onClick={handleLogout} style={styles.logoutButton}>
                        🚪 Logout
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main style={styles.mainContent}>
                {/* Header */}
                <header style={styles.header}>
                    <div>
                        <h1 style={styles.headerTitle}>
                            {activeTab === "overview" && "Seller Overview"}
                            {activeTab === "orders" && "Order Management"}
                            {activeTab === "products" && "Product Catalog"}
                            {activeTab === "addproduct" && "Add New Product"}
                        </h1>
                        <p style={styles.headerSubtitle}>Logged in as Seller: <strong>{shop?.owner}</strong> ({shop?.email})</p>
                    </div>
                    <div style={styles.statusBadge}>
                        🟢 Active Partner
                    </div>
                </header>

                {/* Tab Contents */}
                <div style={styles.contentBody}>
                    {/* TAB: OVERVIEW */}
                    {activeTab === "overview" && (
                        <div style={styles.overviewGrid}>
                            <div style={styles.statCard}>
                                <div style={styles.statIcon}>💰</div>
                                <div>
                                    <div style={styles.statValue}>₹{totalSales.toLocaleString()}</div>
                                    <div style={styles.statLabel}>Total Sales Revenue</div>
                                </div>
                            </div>
                            <div style={styles.statCard}>
                                <div style={styles.statIcon}>🎒</div>
                                <div>
                                    <div style={styles.statValue}>{products.length}</div>
                                    <div style={styles.statLabel}>Listed Products</div>
                                </div>
                            </div>
                            <div style={styles.statCard}>
                                <div style={styles.statIcon}>📋</div>
                                <div>
                                    <div style={styles.statValue}>{orders.length}</div>
                                    <div style={styles.statLabel}>Total Orders Handled</div>
                                </div>
                            </div>

                            <div style={{ ...styles.card, gridColumn: "span 3" }}>
                                <h3 style={styles.cardTitle}>Store Profile Details</h3>
                                <div style={styles.detailsGrid}>
                                    <div style={styles.detailItem}>
                                        <span style={styles.detailLabel}>Shop Name</span>
                                        <span style={styles.detailValue}>{shop?.name}</span>
                                    </div>
                                    <div style={styles.detailItem}>
                                        <span style={styles.detailLabel}>Contact Mobile</span>
                                        <span style={styles.detailValue}>{shop?.mobile}</span>
                                    </div>
                                    <div style={styles.detailItem}>
                                        <span style={styles.detailLabel}>City Location</span>
                                        <span style={styles.detailValue}>{shop?.city}</span>
                                    </div>
                                    <div style={styles.detailItem}>
                                        <span style={styles.detailLabel}>Postal Code / Pincode</span>
                                        <span style={styles.detailValue}>{shop?.pincode}</span>
                                    </div>
                                    <div style={{ ...styles.detailItem, gridColumn: "span 2" }}>
                                        <span style={styles.detailLabel}>Warehouse / Store Address</span>
                                        <span style={styles.detailValue}>{shop?.address}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB: PRODUCTS CATALOG */}
                    {activeTab === "products" && (
                        <div>
                            {products.length === 0 ? (
                                <div style={styles.emptyState}>
                                    <p>No products listed in your seller catalog yet.</p>
                                    <button onClick={() => setActiveTab("addproduct")} style={styles.emptyStateButton}>
                                        Add Your First Product
                                    </button>
                                </div>
                            ) : (
                                <div style={styles.menuGrid}>
                                    {products.map((product) => (
                                        <div key={product._id} style={styles.menuCard}>
                                            {product.productphoto && product.productphoto.length > 0 && (
                                                <div style={styles.imageContainer}>
                                                    <img
                                                        src={getProductImage(product.productphoto)}
                                                        alt={product.productname}
                                                        style={styles.productImage}
                                                    />
                                                </div>
                                            )}
                                            <div style={styles.menuCardHeader}>
                                                <h4 style={styles.menuItemName}>{product.productname}</h4>
                                                <span style={styles.menuItemPrice}>₹{product.price.toLocaleString()}</span>
                                            </div>
                                            <div style={styles.tagContainer}>
                                                <span style={styles.menuItemCategory}>{product.categoryname}</span>
                                                <span style={styles.brandTag}>{product.brandname}</span>
                                            </div>
                                            <div style={styles.prodDetailsList}>
                                                <div><strong>Model:</strong> {product.modelnumber} ({product.modelyear})</div>
                                                <div><strong>Color:</strong> {product.color} | <strong>Weight:</strong> {product.weight}</div>
                                                <div><strong>Warranty:</strong> {product.warranty}</div>
                                            </div>
                                            <div style={styles.menuCardFooter}>
                                                <span></span> 
                                                <button onClick={() => handleDeleteProduct(product._id)} style={styles.deleteButton}>
                                                    Remove Product
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* TAB: ADD PRODUCT */}
                    {activeTab === "addproduct" && (
                        <div style={{ ...styles.card, maxWidth: "700px", margin: "0 auto" }}>
                            <h3 style={styles.cardTitle}>Add Product to Catalog</h3>
                            
                            {error && <div style={styles.errorBanner}>{error}</div>}
                            {success && <div style={styles.successBanner}>{success}</div>}

                            <form onSubmit={handleAddProductSubmit}>
                                <div style={styles.formGrid}>
                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Product Name</label>
                                        <input
                                            type="text"
                                            name="productname"
                                            value={newProduct.productname}
                                            onChange={handleProductChange}
                                            required
                                            placeholder="e.g. Wireless Noise Cancelling Earbuds"
                                            style={styles.input}
                                        />
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Price (INR)</label>
                                        <input
                                            type="number"
                                            name="price"
                                            value={newProduct.price}
                                            onChange={handleProductChange}
                                            required
                                            placeholder="e.g. 2999"
                                            style={styles.input}
                                        />
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Brand Name</label>
                                        <input
                                            type="text"
                                            name="brandname"
                                            value={newProduct.brandname}
                                            onChange={handleProductChange}
                                            required
                                            placeholder="e.g. Sony, Apple, Samsung"
                                            style={styles.input}
                                        />
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Category Name</label>
                                        <input
                                            type="text"
                                            name="categoryname"
                                            value={newProduct.categoryname}
                                            onChange={handleProductChange}
                                            required
                                            placeholder="e.g. Electronics, Footwear, Books"
                                            style={styles.input}
                                        />
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Model Number</label>
                                        <input
                                            type="text"
                                            name="modelnumber"
                                            value={newProduct.modelnumber}
                                            onChange={handleProductChange}
                                            required
                                            placeholder="e.g. WH-1000XM5"
                                            style={styles.input}
                                        />
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Model Year</label>
                                        <input
                                            type="number"
                                            name="modelyear"
                                            value={newProduct.modelyear}
                                            onChange={handleProductChange}
                                            required
                                            placeholder="e.g. 2026"
                                            style={styles.input}
                                        />
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Color</label>
                                        <input
                                            type="text"
                                            name="color"
                                            value={newProduct.color}
                                            onChange={handleProductChange}
                                            placeholder="e.g. Space Grey, Midnight"
                                            style={styles.input}
                                        />
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Weight</label>
                                        <input
                                            type="text"
                                            name="weight"
                                            value={newProduct.weight}
                                            onChange={handleProductChange}
                                            placeholder="e.g. 250g, 1.2kg"
                                            style={styles.input}
                                        />
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Warranty</label>
                                        <input
                                            type="text"
                                            name="warranty"
                                            value={newProduct.warranty}
                                            onChange={handleProductChange}
                                            placeholder="e.g. 1 Year Domestic Warranty"
                                            style={styles.input}
                                        />
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Included Components</label>
                                        <input
                                            type="text"
                                            name="includedcomponent"
                                            value={newProduct.includedcomponent}
                                            onChange={handleProductChange}
                                            placeholder="e.g. Charger, User Manual, Cable"
                                            style={styles.input}
                                        />
                                    </div>
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Upload Product Photos</label>
                                    <input
                                        id="productphoto-input"
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={(e) => setProductphotos([...e.target.files])}
                                        style={styles.input}
                                    />
                                </div>

                                <button type="submit" disabled={actionLoading} style={styles.submitButton}>
                                    {actionLoading ? "Saving Product..." : "Create Product Listing"}
                                </button>
                            </form>
                        </div>
                    )}

                    {/* TAB: ORDERS */}
                    {activeTab === "orders" && (
                        <div style={styles.card}>
                            <div style={styles.orderTabHeader}>
                                <h3 style={styles.cardTitle}>Sales Orders History</h3>
                                <button
                                    onClick={handleSimulateOrder}
                                    disabled={actionLoading}
                                    style={styles.simulateButton}
                                >
                                    ⚡ Simulate Incoming Order
                                </button>
                            </div>
                            
                            {error && <div style={styles.errorBanner}>{error}</div>}
                            {success && <div style={styles.successBanner}>{success}</div>}

                            {orders.length === 0 ? (
                                <div style={styles.emptyState}>
                                    <p>No orders registered for this seller shop yet.</p>
                                    <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "5px" }}>
                                        Click the "Simulate Incoming Order" button above to pull sample catalog products from your database!
                                    </p>
                                </div>
                            ) : (
                                <div style={{ overflowX: "auto" }}>
                                    <table style={styles.table}>
                                        <thead>
                                            <tr style={styles.tableHeaderRow}>
                                                <th style={styles.th}>Order ID</th>
                                                <th style={styles.th}>Customer</th>
                                                <th style={styles.th}>Products Ordered</th>
                                                <th style={styles.th}>Total Value</th>
                                                <th style={styles.th}>Fulfillment Status</th>
                                                <th style={styles.th}>Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map((order) => (
                                                <tr key={order._id} style={styles.tableRow}>
                                                    <td style={{ ...styles.td, fontWeight: "600" }}>{order._id.substring(18)}</td>
                                                    <td style={styles.td}>{order.customerName || "Customer"}</td>
                                                    <td style={styles.td}>
                                                        {order.items
                                                            .filter(item => item.shopId === shop?._id)
                                                            .map((item, index) => (
                                                                <div key={index} style={{ fontSize: "13px" }}>
                                                                    • {item.product} (x{item.quantity})
                                                                </div>
                                                            ))
                                                        }
                                                    </td>
                                                    <td style={{ ...styles.td, fontWeight: "600", color: "var(--color-accent)" }}>
                                                        ₹{order.items
                                                            .filter(item => item.shopId === shop?._id)
                                                            .reduce((sum, item) => sum + (item.price * item.quantity), 0)
                                                            .toLocaleString()
                                                        }
                                                    </td>
                                                    <td style={styles.td}>
                                                         <select
                                                             value={order.orderstatus}
                                                             onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                                                             style={{
                                                                 ...styles.statusDropdown,
                                                                 color: getStatusColor(order.orderstatus).color,
                                                                 borderColor: getStatusColor(order.orderstatus).border
                                                             }}
                                                         >
                                                             <option value="Order Placed">🛒 Order Placed</option>
                                                             <option value="Order Confirmed">✅ Order Confirmed</option>
                                                             <option value="Processing / Packed">📦 Processing / Packed</option>
                                                             <option value="Shipped">🚚 Shipped</option>
                                                             <option value="In Transit">🚛 In Transit</option>
                                                             <option value="Out for Delivery">🏠 Out for Delivery</option>
                                                             <option value="Delivered">🎉 Delivered</option>
                                                         </select>
                                                    </td>
                                                    <td style={styles.td}>{new Date(order.ordereddate).toLocaleDateString()}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

const styles = {
    loadingContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "var(--bg-primary)"
    },
    spinner: {
        width: "50px",
        height: "50px",
        border: "5px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "50%",
        borderTopColor: "var(--color-accent)",
        animation: "spin 1s ease-in-out infinite"
    },
    dashboardLayout: {
        display: "flex",
        minHeight: "100vh",
        background: "var(--bg-primary)"
    },
    sidebar: {
        width: "260px",
        background: "var(--bg-secondary)",
        borderRight: "1px solid var(--border-color)",
        display: "flex",
        flexDirection: "column",
        padding: "25px 15px"
    },
    brand: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "40px",
        padding: "0 10px"
    },
    brandIcon: {
        fontSize: "24px"
    },
    brandName: {
        fontSize: "18px",
        fontWeight: "700",
        color: "var(--text-primary)"
    },
    brandStatus: {
        fontSize: "12px",
        color: "var(--text-secondary)"
    },
    navMenu: {
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        flexGrow: 1
    },
    navItem: {
        display: "block",
        width: "100%",
        textAlign: "left",
        background: "none",
        border: "none",
        color: "var(--text-secondary)",
        padding: "12px 16px",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: "500",
        cursor: "pointer",
        transition: "all var(--transition-speed)"
    },
    navItemActive: {
        background: "var(--color-accent)",
        color: "#fff"
    },
    sidebarFooter: {
        paddingTop: "20px",
        borderTop: "1px solid var(--border-color)"
    },
    logoutButton: {
        width: "100%",
        background: "rgba(239, 68, 68, 0.1)",
        border: "1px solid rgba(239, 68, 68, 0.2)",
        borderRadius: "8px",
        padding: "12px",
        color: "#f87171",
        fontSize: "14px",
        fontWeight: "600",
        cursor: "pointer",
        transition: "all var(--transition-speed)"
    },
    mainContent: {
        flexGrow: 1,
        padding: "40px",
        overflowY: "auto"
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid var(--border-color)",
        paddingBottom: "20px",
        marginBottom: "30px"
    },
    headerTitle: {
        fontSize: "26px",
        fontWeight: "700"
    },
    headerSubtitle: {
        fontSize: "14px",
        color: "var(--text-secondary)",
        marginTop: "4px"
    },
    statusBadge: {
        background: "rgba(16, 185, 129, 0.15)",
        border: "1px solid var(--color-success)",
        color: "#34d399",
        padding: "6px 12px",
        borderRadius: "20px",
        fontSize: "13px",
        fontWeight: "600"
    },
    contentBody: {
        animation: "fadeIn 0.5s ease"
    },
    overviewGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "25px",
        marginBottom: "25px"
    },
    statCard: {
        background: "var(--bg-secondary)",
        border: "1px solid var(--border-color)",
        borderRadius: "12px",
        padding: "25px",
        display: "flex",
        alignItems: "center",
        gap: "20px"
    },
    statIcon: {
        fontSize: "36px"
    },
    statValue: {
        fontSize: "28px",
        fontWeight: "700"
    },
    statLabel: {
        fontSize: "14px",
        color: "var(--text-secondary)"
    },
    card: {
        background: "var(--bg-card)",
        border: "1px solid var(--border-color)",
        borderRadius: "12px",
        padding: "30px",
        boxShadow: "var(--card-shadow)",
        backdropFilter: "blur(10px)"
    },
    cardTitle: {
        fontSize: "18px",
        fontWeight: "600",
        marginBottom: "0px"
    },
    orderTabHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
        borderBottom: "1px solid var(--border-color)",
        paddingBottom: "15px"
    },
    simulateButton: {
        background: "rgba(99, 102, 241, 0.15)",
        border: "1px solid var(--color-accent)",
        borderRadius: "8px",
        padding: "10px 18px",
        color: "#a5b4fc",
        fontSize: "13px",
        fontWeight: "600",
        cursor: "pointer",
        transition: "all var(--transition-speed)"
    },
    detailsGrid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px"
    },
    detailItem: {
        display: "flex",
        flexDirection: "column"
    },
    detailLabel: {
        fontSize: "11px",
        textTransform: "uppercase",
        color: "var(--text-secondary)",
        marginBottom: "4px"
    },
    detailValue: {
        fontSize: "15px",
        fontWeight: "500"
    },
    emptyState: {
        textAlign: "center",
        padding: "60px 20px",
        background: "var(--bg-secondary)",
        borderRadius: "12px",
        border: "1px dashed var(--border-color)",
        marginTop: "10px"
    },
    menuGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "25px"
    },
    menuCard: {
        background: "var(--bg-secondary)",
        border: "1px solid var(--border-color)",
        borderRadius: "12px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
    },
    imageContainer: {
        width: "100%",
        height: "180px",
        borderRadius: "8px",
        overflow: "hidden",
        marginBottom: "15px",
        background: "rgba(255, 255, 255, 0.02)",
        border: "1px solid var(--border-color)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    productImage: {
        width: "100%",
        height: "100%",
        objectFit: "cover"
    },
    menuCardHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: "6px"
    },
    menuItemName: {
        fontSize: "16px",
        fontWeight: "600",
        color: "var(--text-primary)"
    },
    menuItemPrice: {
        fontSize: "16px",
        fontWeight: "700",
        color: "var(--color-accent)"
    },
    tagContainer: {
        display: "flex",
        gap: "8px",
        marginBottom: "12px"
    },
    menuItemCategory: {
        fontSize: "11px",
        background: "rgba(99, 102, 241, 0.15)",
        padding: "3px 8px",
        borderRadius: "4px",
        color: "#a5b4fc"
    },
    brandTag: {
        fontSize: "11px",
        background: "rgba(255, 255, 255, 0.06)",
        padding: "3px 8px",
        borderRadius: "4px",
        color: "var(--text-secondary)"
    },
    prodDetailsList: {
        fontSize: "13px",
        color: "var(--text-secondary)",
        lineHeight: "1.6",
        flexGrow: 1,
        marginBottom: "15px"
    },
    menuCardFooter: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    deleteButton: {
        background: "none",
        border: "none",
        color: "var(--color-error)",
        cursor: "pointer",
        fontWeight: "600",
        fontSize: "13px"
    },
    formGrid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
        marginBottom: "20px"
    },
    formGroup: {
        display: "flex",
        flexDirection: "column",
        marginBottom: "10px"
    },
    label: {
        fontSize: "12px",
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        color: "var(--text-secondary)",
        marginBottom: "8px"
    },
    input: {
        background: "rgba(255, 255, 255, 0.04)",
        border: "1px solid var(--border-color)",
        borderRadius: "8px",
        padding: "12px 16px",
        color: "var(--text-primary)",
        fontSize: "14px",
        outline: "none"
    },
    submitButton: {
        width: "100%",
        background: "var(--color-accent)",
        border: "none",
        borderRadius: "8px",
        padding: "14px",
        color: "#fff",
        fontSize: "16px",
        fontWeight: "600",
        cursor: "pointer",
        marginTop: "10px"
    },
    errorBanner: {
        background: "rgba(239, 68, 68, 0.15)",
        border: "1px solid var(--color-error)",
        color: "#fca5a5",
        borderRadius: "8px",
        padding: "12px",
        fontSize: "14px",
        marginBottom: "20px"
    },
    successBanner: {
        background: "rgba(16, 185, 129, 0.15)",
        border: "1px solid var(--color-success)",
        color: "#a7f3d0",
        borderRadius: "8px",
        padding: "12px",
        fontSize: "14px",
        marginBottom: "20px"
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "10px"
    },
    tableHeaderRow: {
        borderBottom: "2px solid var(--border-color)",
        textAlign: "left"
    },
    th: {
        padding: "12px",
        color: "var(--text-secondary)",
        fontSize: "13px",
        fontWeight: "600",
        textTransform: "uppercase"
    },
    tableRow: {
        borderBottom: "1px solid var(--border-color)"
    },
    td: {
        padding: "16px 12px",
        fontSize: "14px"
    },
    statusDropdown: {
        background: "rgba(255, 255, 255, 0.04)",
        border: "1px solid",
        borderRadius: "6px",
        padding: "6px 10px",
        fontSize: "13px",
        fontWeight: "600",
        outline: "none",
        cursor: "pointer"
    }
};

export default ShopDashboard;