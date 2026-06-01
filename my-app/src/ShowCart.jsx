import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/ShowCart.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ShowCart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const response = await axios.get("http://localhost:8000/cart/showcart");
      setCart(response.data);
    } catch (error) {
      toast.error("Failed to fetch cart");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="show-cart-container">
      <div className="show-cart-header">
        <h2>Show Cart</h2>

        <button
          className="back-btn"
          onClick={() => navigate("/adminpanel/managecart")}
        >
          Back
        </button>
      </div>

      <div className="cart-grid">
        {cart.length > 0 ? (
          cart.map((c) => (
            <div className="cart-card" key={c._id}>
              <h3>Cart Details</h3>

              <p>
                <strong>Product ID:</strong> {c.product_id}
              </p>

              <p>
                <strong>User ID:</strong> {c.user_id}
              </p>

              <p>
                <strong>Quantity:</strong> {c.quantity}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {c.cart_status === 1 ? "Active" : "Inactive"}
              </p>

              <p>
                <strong>Created:</strong>{" "}
                {new Date(c.cdate).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p>No Cart Found</p>
        )}
      </div>
    </div>
  );
}