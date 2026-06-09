import React, { useState, useEffect } from "react";
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
    FaShoppingCart
} from "react-icons/fa";
import "./Cart.css";

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
                            razorpay_signature: response.razorpay_signature
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
                                                    ? item.product_id.productphoto[0]
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