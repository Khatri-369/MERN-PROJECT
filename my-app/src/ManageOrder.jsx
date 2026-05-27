import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/ManageOrder.css";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function ManageOrder() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/order/showorder"
      );

      setOrders(res.data);

    } catch (error) {
      console.log(error);
      toast.error("FAILED TO LOAD ORDERS");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const deleteOrder = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8000/order/deleteorder/${id}`
      );

      toast.success("ORDER DELETED");
      fetchOrders();

    } catch (error) {
      console.log(error);
      toast.error("DELETE FAILED");
    }
  };

  return (
    <div className="manage-order-container">
      <h2>Manage Orders</h2>

      <table className="manage-order-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Product</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((item) => (
            <tr key={item._id}>
              <td>{item.user}</td>
              <td>{item.items[0].product}</td>
              <td>₹{item.totalprice}</td>
              <td>{item.orderstatus}</td>

              <td>
                <Link to={`/updateorder/${item._id}`}>
                  <button className="edit-btn">Edit</button>
                </Link>

                <button
                  className="delete-btn"
                  onClick={() => deleteOrder(item._id)}
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