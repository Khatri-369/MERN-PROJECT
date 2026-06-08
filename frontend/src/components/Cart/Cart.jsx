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

export default function Cart({ cartUpdated, setCartUpdated }) {
    const [cartItems, setCartItems] = useState([]);
    let total = 0;

    // Calculate total price dynamically from cartItems
    for(const item of cartItems){
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

    return (
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
            </div>
        </div>
    );
}