import React, { useState,useEffect } from "react";
import axios from "axios";
import "./css/SearchCart.css";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function SearchCart() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

   useEffect(() => {
    const getCarts = async () => {
      try {
        const res = await axios.get("http://localhost:8000/cart/showcart");
        setCart(res.data);
      } catch (error) {
        console.log(error.response?.data || error.message);
        toast.error("FAILED TO LOAD CARTS");
      }
    };

    getCarts();
  }, []);

  const searchCart = async () => {
    if (!search.trim()) {
      toast.error("Enter user name");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8000/cart/showcartbysearch?search=${search}`
      );

      setCart(response.data);
    } catch (error) {
      toast.error("Cart Not Found");
      setCart([]);
      console.log(error);
    }
  };

  return (
    <div className="searchcart-container">
      <h1>Search Cart</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search by user name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={searchCart}>Search</button>
      </div>

      {cart.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total Price</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {cart.map((item) => (
              <tr key={item._id}>
                <td>{item.user}</td>
                <td>{item.items[0].product}</td>
                <td>{item.items[0].quantity}</td>
                <td>₹{item.items[0].price}</td>
                <td>₹{item.totalprice}</td>

                <td>
                  <Link to={`/cartdetail/${item._id}`}>
                    <button className="view-btn">View</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}