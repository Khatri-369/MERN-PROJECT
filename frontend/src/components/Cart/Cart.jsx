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

export default function Cart({ cartUpdated, setCartUpdated }){
      const [cartItems, setCartItems] = useState([]);

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
        return cartItems.find(item => item.product_id === productId);
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
            <div className="body-container">
                {/* Header Section */}
                <div className="body-header">
                    <h1 className="body-title">YOUR CART</h1>
                </div>
    
                {/* Main Content Area */}
                <div className="product-grid animate-fade-in">
                    {cartItems.map((item) => (
                            <div key={item._id} className="product-card">
                                <div className="product-image">
                                    <img 
                                        src={Array.isArray(item.productphoto) ? item.productphoto[0] : item.productphoto} 
                                        alt={item.productname} 
                                    />
                                </div>
    
                                <div className="product-info">
                                    <div className="brand-label">{item.brandname}</div>
                                     <h2 className="product-name" title={item.productname}>
                                         {item.productname}
                                     </h2>
                                     
                                     <div className="product-price-container">
                                         <span className="price-symbol">₹</span>
                                         <span className="price-amount">{item.price}</span>
                                     </div>
                                     
                                     <div className="specs-grid">
                                        <div className="spec-item">
                                            <FaTag className="spec-icon" />
                                            <div className="spec-details">
                                                <span className="spec-label">Model</span>
                                                <span className="spec-value" title={item.modelnumber}>{item.modelnumber}</span>
                                            </div>
                                        </div>
                                        <div className="spec-item">
                                            <FaCalendarAlt className="spec-icon" />
                                            <div className="spec-details">
                                                <span className="spec-label">Year</span>
                                                <span className="spec-value">{item.modelyear}</span>
                                            </div>
                                        </div>
                                        <div className="spec-item">
                                            <FaPalette className="spec-icon" />
                                            <div className="spec-details">
                                                <span className="spec-label">Color</span>
                                                <span className="spec-value">{item.color}</span>
                                            </div>
                                        </div>
                                        <div className="spec-item">
                                            <FaWeightHanging className="spec-icon" />
                                            <div className="spec-details">
                                                <span className="spec-label">Weight</span>
                                                <span className="spec-value">{item.weight}</span>
                                            </div>
                                        </div>
                                        <div className="spec-item full-width">
                                            <FaBoxOpen className="spec-icon" />
                                            <div className="spec-details">
                                                <span className="spec-label">Included</span>
                                                <span className="spec-value" title={item.includedcomponent}>{item.includedcomponent}</span>
                                            </div>
                                        </div>
                                        <div className="spec-item full-width">
                                            <FaShieldAlt className="spec-icon" />
                                            <div className="spec-details">
                                                <span className="spec-label">Warranty</span>
                                                <span className="spec-value" title={item.warranty}>{item.warranty}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="product-actions">
                                        {getCartItem(item._id) ? (
                                            <div className="quantity-control">
                                                <button onClick={() => handleDecrement(getCartItem(item._id))} className="quantity-btn">-</button>
                                                <span className="quantity-value">{getCartItem(item._id).quantity}</span>
                                                <button onClick={() => handleIncrement(getCartItem(item._id))} className="quantity-btn">+</button>
                                            </div>
                                        ) : (
                                            <button className="add-to-cart-btn">
                                                <FaShoppingCart /> Add to Cart
                                            </button>
                                        )}
                                    </div>
    
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        );
}