import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/ManageCart.css";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function ManageCart() {
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

  const deleteCart = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/cart/deletecart/${id}`);
      toast.success("Cart Deleted Successfully");
      fetchCart();
    } catch (error) {
      toast.error("Delete Failed");
      console.log(error);
    }
  };

  return (
    <div className="managecart-container">
      <h1>Manage Cart</h1>

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
                <Link to={`/editcart/${item._id}`}>
                  <button className="edit-btn">Edit</button>
                </Link>

                <button
                  className="delete-btn"
                  onClick={() => deleteCart(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}