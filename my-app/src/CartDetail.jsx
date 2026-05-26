import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/CartDetail.css";
import toast from "react-hot-toast";
import { useParams, Link } from "react-router-dom";

export default function CartDetails() {
  const { id } = useParams();
  const [cart, setCart] = useState(null);

  const fetchCart = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/cart/showcartbyid/${id}`);
      setCart(response.data);
    } catch (error) {
      toast.error("Failed to fetch cart details");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (!cart) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="cartdetails-container">
      <div className="cartdetails-card">
        <h1>Cart Details</h1>

        <p>
          <strong>User:</strong> {cart.user}
        </p>

        <p>
          <strong>Product:</strong> {cart.items[0].product}
        </p>

        <p>
          <strong>Quantity:</strong> {cart.items[0].quantity}
        </p>

        <p>
          <strong>Price:</strong> ₹{cart.items[0].price}
        </p>

        <p>
          <strong>Total Price:</strong> ₹{cart.totalprice}
        </p>

        <Link to="/showcart">
          <button>Back to Show Cart</button>
        </Link>
      </div>
    </div>
  );
}