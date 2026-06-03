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
      toast.error("Failed to fetch carts");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const deleteCart = async (id) => {
    if (!window.confirm("Are you sure you want to delete this cart?")) return;

    try {
      await axios.delete(`http://localhost:8000/cart/deletecart/${id}`);
      toast.success("Cart Deleted Successfully");
      fetchCart();
    } catch (error) {
      toast.error("Delete Failed");
    }
  };

  return (
    <div className="manage-cart-container">
      <div className="manage-cart-header">
        <h2>Manage Cart</h2>

        <Link to="/adminpanel/createcart">
          <button>Add Cart</button>
        </Link>
      </div>

      <table className="cart-table">
        <thead>
          <tr>
            <th>PRODUCT ID</th>
            <th>USER ID</th>
            <th>QUANTITY</th>
            <th>STATUS</th>
            <th>CREATED DATE</th>
            <th>ACTION</th>
          </tr>
        </thead>

        <tbody>
          {cart.length > 0 ? (
            cart.map((c) => (
              <tr key={c._id}>
                <td>{c.product_id}</td>
                <td>{c.user_id}</td>
                <td>{c.quantity}</td>

                <td>
                  <span
                    className={
                      c.cart_status === 1
                        ? "status-active"
                        : "status-inactive"
                    }
                  >
                    {c.cart_status === 1 ? "Active" : "Inactive"}
                  </span>
                </td>

                <td>{new Date(c.cdate).toLocaleDateString()}</td>

                <td className="action-buttons">
                  <Link to="/adminpanel/showcart">
                    <button className="view-btn">View</button>
                  </Link>

                  <Link to={`/adminpanel/editcart/${c._id}`}>
                    <button className="edit-btn">Edit</button>
                  </Link>

                  <button
                    className="delete-btn"
                    onClick={() => deleteCart(c._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No Cart Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}