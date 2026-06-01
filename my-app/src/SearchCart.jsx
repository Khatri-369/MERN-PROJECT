import React, { useState,useEffect } from "react";
import axios from "axios";
import "./css/SearchCart.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function SearchCart() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

   useEffect(()=>{
          const getdata = async()=>{
              const value = await axios.get("http://localhost:8000/cart/showcart");
              setCart(value.data);
          }
          getdata();
    },[]);

  const searchCart = async () => {
    if (!search.trim()) {
      toast.error("Enter user ID");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8000/cart/searchcart?search=${search}`
      );

      setCart(response.data);

    } catch (error) {
      toast.error("Cart Not Found");
      setCart([]);
      console.log(error);
    }
  };

  return (
    <div className="search-cart-container">
      <div className="search-cart-header">
        <h2>Search Cart</h2>

        <button
          className="back-btn"
          onClick={() => navigate("/adminpanel/managecart")}
        >
          Back
        </button>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search by User ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={searchCart}>Search</button>
      </div>

      <div className="search-results">
        {cart.length > 0 ? (
          cart.map((c) => (
            <div className="search-card" key={c._id}>
              <h3>Cart Details</h3>

              <p><strong>Product ID:</strong> {c.product_id}</p>
              <p><strong>User ID:</strong> {c.user_id}</p>
              <p><strong>Quantity:</strong> {c.quantity}</p>

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
          <p>No Result</p>
        )}
      </div>
    </div>
  );
}