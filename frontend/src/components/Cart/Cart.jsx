import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import {
    FaCalendarAlt,
    FaPalette,
    FaWeightHanging,
    FaBoxOpen,
    FaShieldAlt,
    FaTag,
    FaShoppingCart,
    FaMapMarkerAlt
} from "react-icons/fa";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Cart.css";

// Fix default marker icon issue with Leaflet in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

//Razorpay provides a JavaScript library called:
//<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
//This library creates -> window.Razorpay (on window)



export default function Cart({ cartUpdated, setCartUpdated }) {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    let total = 0;

    // Location Order Map states & refs
    const [latitude, setLatitude] = useState(22.3072);
    const [longitude, setLongitude] = useState(73.1812);
    const [customAddress, setCustomAddress] = useState("");
    const [userProfile, setUserProfile] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const mapContainerRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const markerInstanceRef = useRef(null);

    // Initial load: Fetch profile and set initial map center
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const userRes = await axios.get("http://localhost:8000/user/showoneuser");
                setUserProfile(userRes.data);
                
                const addr = `${userRes.data.first_name} ${userRes.data.last_name || ""}, ${userRes.data.city || ""}, ${userRes.data.state || ""} - ${userRes.data.pin_code || ""}, Mobile: ${userRes.data.mobile_no || ""}`;
                setCustomAddress(addr);

                const searchStr = `${userRes.data.city || ""}, ${userRes.data.state || ""}, India`;
                try {
                    const geoRes = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchStr)}`);
                    if (geoRes.data && geoRes.data.length > 0) {
                        const { lat, lon } = geoRes.data[0];
                        const latNum = Number(lat);
                        const lonNum = Number(lon);
                        setLatitude(latNum);
                        setLongitude(lonNum);
                        
                        if (mapInstanceRef.current) {
                            mapInstanceRef.current.setView([latNum, lonNum], 13);
                            if (markerInstanceRef.current) {
                                markerInstanceRef.current.setLatLng([latNum, lonNum]);
                            }
                        }
                    }
                } catch (geoErr) {
                    console.error("Geocoding profile address failed:", geoErr);
                }
            } catch (err) {
                console.error("Error fetching user profile:", err);
            }
        };
        fetchProfile();
    }, []);

    // Create Map Instance once container is ready
    useEffect(() => {
        if (!mapContainerRef.current || mapInstanceRef.current) return;

        const map = L.map(mapContainerRef.current).setView([latitude, longitude], 13);
        mapInstanceRef.current = map;

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const marker = L.marker([latitude, longitude], { draggable: true }).addTo(map);
        markerInstanceRef.current = marker;

        const updateLocation = async (lat, lng) => {
            setLatitude(lat);
            setLongitude(lng);
            try {
                const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`);
                if (res.data && res.data.display_name) {
                    let formatted = res.data.display_name;
                    if (userProfile) {
                        formatted = `${userProfile.first_name} ${userProfile.last_name || ""}, ${res.data.display_name}, Mobile: ${userProfile.mobile_no || ""}`;
                    }
                    setCustomAddress(formatted);
                }
            } catch (err) {
                console.error("Error reverse geocoding:", err);
            }
        };

        marker.on("dragend", async (e) => {
            const { lat, lng } = e.target.getLatLng();
            await updateLocation(lat, lng);
        });

        map.on("click", async (e) => {
            const { lat, lng } = e.latlng;
            marker.setLatLng([lat, lng]);
            await updateLocation(lat, lng);
        });

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
                markerInstanceRef.current = null;
            }
        };
    }, [userProfile]);

    const handleMapSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        try {
            const geoRes = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
            if (geoRes.data && geoRes.data.length > 0) {
                const { lat, lon, display_name } = geoRes.data[0];
                const latNum = Number(lat);
                const lonNum = Number(lon);
                setLatitude(latNum);
                setLongitude(lonNum);

                if (mapInstanceRef.current) {
                    mapInstanceRef.current.setView([latNum, lonNum], 14);
                    if (markerInstanceRef.current) {
                        markerInstanceRef.current.setLatLng([latNum, lonNum]);
                    }
                }
                
                let formatted = display_name;
                if (userProfile) {
                    formatted = `${userProfile.first_name} ${userProfile.last_name || ""}, ${display_name}, Mobile: ${userProfile.mobile_no || ""}`;
                }
                setCustomAddress(formatted);
            } else {
                toast.error("Location not found");
            }
        } catch (err) {
            console.error("Search error:", err);
            toast.error("Failed to search location");
        }
    };

    // Calculate total price dynamically from cartItems
    for (const item of cartItems) {
        total += item.product_id.price * Number(item.quantity);
    }

    const fetchCartItems = async () => {
        try {
            const response = await axios.get("http://localhost:8000/cart/showonecart");
            setCartItems(response.data);
        } catch (error) {
            console.error("Error loading cart items:", error);
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, [cartUpdated]);

    const getCartItem = (productId) => {
        return cartItems.find(item => {
            const itemProdId = item.product_id?._id || item.product_id;
            return itemProdId === productId;
        });
    };

    const handleIncrement = async (cartItem) => {
        try {
            const newQty = Number(cartItem.quantity || 0) + 1;
            await axios.put(`http://localhost:8000/cart/updatecart/${cartItem._id}`, {
                quantity: String(newQty)
            });
            setCartUpdated(prev => !prev);
        } catch (error) {
            toast.error("Failed to update quantity");
        }
    };

    const handleDecrement = async (cartItem) => {
        try {
            const newQty = Number(cartItem.quantity || 0) - 1;
            if (newQty <= 0) {
                await axios.delete(`http://localhost:8000/cart/deletecart/${cartItem._id}`);
                toast.success("Product removed from cart!");
            } else {
                await axios.put(`http://localhost:8000/cart/updatecart/${cartItem._id}`, {
                    quantity: String(newQty)
                });
            }
            setCartUpdated(prev => !prev);
        } catch (error) {
            toast.error("Failed to update quantity");
        }
    };

    const orderNow = async () => {
        if (loading) return;
        if (cartItems.length === 0) {
            toast.error("Your cart is empty");
            return;
        }
        setLoading(true);
        try {
            // 1. Load Razorpay SDK
            const isLoaded = await loadRazorpayScript();
            if (!isLoaded) {
                toast.error("Failed to load Razorpay SDK. Are you online?");
                setLoading(false);
                return;
            }

            // 2. Fetch User Profile for prefill
            let userProfile = {};
            try {
                const userRes = await axios.get("http://localhost:8000/user/showoneuser");
                userProfile = userRes.data;
            } catch (err) {
                console.warn("Could not fetch user profile details for checkout prefill:", err);
            }

            // 3. Create order on the backend
            const orderRes = await axios.post("http://localhost:8000/payment/createorder");
            const { order, key_id } = orderRes.data;

            // 4. Set up Razorpay Checkout Options
            const options = {
                key: key_id,
                amount: order.amount,
                currency: order.currency,
                name: "MERN Shop",
                description: "Purchase of cart items",
                order_id: order.id,
                handler: async (response) => {
                    setLoading(true);
                    try {
                        const verifyRes = await axios.post("http://localhost:8000/payment/verify", {
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                            latitude,
                            longitude,
                            customAddress
                        });

                        setCartItems([]);
                        setCartUpdated(prev => !prev);
                        toast.success("Order placed successfully! Check details in profile > Past Orders");
                    } catch (verifyError) {
                        toast.error(verifyError.response?.data?.message || "Payment verification failed");
                    } finally {
                        setLoading(false);
                    }
                },
                prefill: {
                    name: userProfile.first_name ? `${userProfile.first_name} ${userProfile.last_name || ""}` : "",
                    email: userProfile.email_id || "",
                    contact: userProfile.mobile_no || ""
                },
                theme: {
                    color: "#111111"
                },
                modal: {
                    ondismiss: () => {
                        setLoading(false);
                    }
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Checkout process error:", error);
            toast.error(error.response?.data?.message || "Checkout failed");
            setLoading(false);
        }
    };

    return (
        <>
            <div className="cart-page-container">
                <div className="cart-main">
                    <div className="cart-main-header">
                        <h1 className="cart-title">YOUR CART</h1>
                    </div>

                    {cartItems.length > 0 ? (
                        <div className="cart-items-list">
                            {cartItems.map((item) => (
                                <div className="cart-item-card" key={item._id}>
                                    <div className="cart-item-image">
                                        {item.product_id?.productphoto?.[0] && (
                                            <img
                                                src={item.product_id.productphoto[0].startsWith("http")
                                                    ? item.product_id.productphoto[0].replace("localhost:8001", "localhost:8000")
                                                    : `http://localhost:8000/uploads/${item.product_id.productphoto[0]}`}
                                                alt={item.product_id.productname || "Product"}
                                            />
                                        )}
                                    </div>
                                    <div className="cart-item-details">
                                        <h3 className="cart-item-name">{item.product_id?.productname || "Unknown Product"}</h3>
                                        <p className="cart-item-brand">Brand: {item.product_id?.brandname || "N/A"}</p>
                                    </div>
                                    <div className="cart-item-price-col">
                                        <span className="cart-item-unit-price">
                                            Price: ₹{item.product_id?.price ?? 0}
                                        </span>
                                        <div className="quantity-control-cart" style={{ marginTop: "12px", alignSelf: "flex-end" }}>
                                            <button onClick={() => handleDecrement(item)} className="quantity-btn-cart">-</button>
                                            <span className="quantity-value-cart">{item.quantity}</span>
                                            <button onClick={() => handleIncrement(item)} className="quantity-btn-cart">+</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="cart-empty-state">
                            <h2>Your Cart is empty.</h2>
                        </div>
                    )}

                    {cartItems.length > 0 && (
                        <div className="checkout-map-container">
                            <h3 className="checkout-section-title">
                                <FaMapMarkerAlt /> Confirm Delivery Location
                            </h3>
                            <p className="checkout-section-desc">
                                Pinpoint your exact location on the map. Drag the marker or click on the map to set the coordinates.
                            </p>
                            
                            <form onSubmit={handleMapSearch} className="map-search-form">
                                <input
                                    type="text"
                                    placeholder="Search street, area, city..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="map-search-input"
                                />
                                <button type="submit" className="map-search-btn">Search Location</button>
                            </form>

                            <div ref={mapContainerRef} className="checkout-leaflet-map" style={{ height: "300px", borderRadius: "8px", margin: "12px 0", zIndex: 10 }}></div>

                            <div className="coordinates-info">
                                <span className="coords-badge">Latitude: {latitude.toFixed(6)}</span>
                                <span className="coords-badge">Longitude: {longitude.toFixed(6)}</span>
                            </div>

                            <div className="delivery-address-field">
                                <label className="address-label">Delivery Address Details</label>
                                <textarea
                                    className="address-textarea"
                                    value={customAddress}
                                    onChange={(e) => setCustomAddress(e.target.value)}
                                    rows="3"
                                    placeholder="Verify or type detailed address (house/flat number, landmarks etc.)"
                                />
                            </div>
                        </div>
                    )}

                    <div className="cart-subtotal-bottom">
                        Subtotal ({cartItems.length} items): <strong>₹{total}</strong>
                    </div>
                    <div className="ORDER-BUTTON" onClick={!loading ? orderNow : null}>
                        <button className="ORDER-BUTTON" disabled={loading}>
                            {loading ? "PLACING ORDER..." : "CHECK OUT"}
                        </button>
                    </div>
                </div>
            </div>

        </>
    );
}