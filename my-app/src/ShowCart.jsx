import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/ShowCart.css";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function ShowCart() {
  const [cart, setCart] = useState([]);

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
    <div className="showcart-container">
      <h1>Show Cart</h1>

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
    </div>
  );
}